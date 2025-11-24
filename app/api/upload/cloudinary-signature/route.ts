import crypto from "crypto";
import { NextResponse } from "next/server";

export function GET(){
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = crypto
      .createHash("sha1")
      .update(
        `timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`
      )
      .digest("hex");

    return NextResponse.json({
      timestamp,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
}

