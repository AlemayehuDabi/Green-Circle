import { chromium } from "playwright";

async function scrapeDealroom() {
  const browser = await chromium.launch({
    headless: true // set false to watch browser
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
    locale: "en-US"
  });

  const page = await context.newPage();

  await page.goto("https://ethiopia.dealroom.co/intro", {
    waitUntil: "networkidle"
  });

  // ⚠️ Wait for companies to render
  await page.waitForTimeout(3000);

  const startups = await page.evaluate(() => {
    const results: any[] = [];

    document.querySelectorAll("a").forEach(el => {
      const name = el.textContent?.trim();
      const href = el.getAttribute("href");

      if (
        name &&
        href &&
        href.includes("/companies/")
      ) {
        results.push({
          name,
          sourceUrl: `https://ethiopia.dealroom.co${href}`
        });
      }
    });

    return results;
  });

  console.log(`✅ Found ${startups.length} startups`);
  console.log(startups);

  await browser.close();
}

scrapeDealroom();
