import axios from "axios";
import * as cheerio from "cheerio";
import slugify from "slugify";
import {connectToDB} from "@/lib/db";
import {Startup} from "@/models/start-up";

const BASE_URL = "https://techcabal.com";

async function scrape() {
  await connectToDB();

  const res = await axios.get(
    "https://techcabal.com/tag/startups/"
  );

  const $ = cheerio.load(res.data);

  const articles: string[] = [];

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.includes("/202")) {
      articles.push(href.startsWith("http") ? href : BASE_URL + href);
    }
  });

  const uniqueArticles = [...new Set(articles)].slice(0, 10);

  for (const url of uniqueArticles) {
    try {
      const articleRes = await axios.get(url);
      const $$ = cheerio.load(articleRes.data);

      const text = $$("body").text();

      // VERY simple extraction (safe)
      const matches = text.match(
        /([A-Z][A-Za-z0-9& ]{2,}) is a .*? startup/gi
      );

      if (!matches) continue;

      for (const match of matches) {
        const name = match.split(" is ")[0].trim();

        const slug = slugify(name, { lower: true });

        const exists = await Startup.findOne({ slug });
        if (exists) continue;

        console.log("startups: ", {
            name,
            slug,
            description: match,
            sources: [{name: "TechCabal", url }],
            confidenceLevel: 1
        })

        // await Startup.create({
        //   name,
        //   slug,
        //   description: match,
        //   sources: [{ name: "TechCabal", url }],
        //   confidenceLevel: 1,
        // });

        console.log(`Added: ${name}`);
      }
    } catch (err) {
      console.log("Skipped article:", url);
    }
  }

  console.log("Scraping done");
}

scrape();
