import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { folder } = req.query; // folder: "images", "videos", "documents"
  if (!folder || !["images", "videos", "documents"].includes(folder as string)) {
    return res.status(400).json({ error: "Invalid folder" });
  }

  const timestamp = Math.round(Date.now() / 1000);

  // signature for Cloudinary upload
  const signature = crypto
    .createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`)
    .digest("hex");

  res.status(200).json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder,
  });
}
