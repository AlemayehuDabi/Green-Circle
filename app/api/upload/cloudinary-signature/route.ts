import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    // 1. Get the folder from the request body
    const body = await request.json();
    const { folder } = body;

    // 2. Validate the folder
    if (!folder || !["images", "videos", "documents"].includes(folder)) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiSecret) {
        return NextResponse.json({ error: "Server misconfigured: Missing API Secret" }, { status: 500 });
    }

    // 3. Generate the signature (Exact logic from your previous code)
    const signature = crypto
      .createHash("sha1")
      .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    // 4. Return the JSON response
    return NextResponse.json({
      timestamp,
      signature,
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      folder,
    });

  } catch (error) {
    console.error("Signature generation failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}