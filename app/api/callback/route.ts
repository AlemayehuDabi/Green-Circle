import { type NextRequest, NextResponse } from "next/server"
import { exchangeFaydaCodeForToken, getUserInfo } from "@/lib/fayda"
import { connectToDB } from "@/lib/db"
import { User } from "@/models/user" // Ensure this import is correct

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect(new URL("/submit/verify", request.url))
  }

  try {
    await connectToDB()
    const token = await exchangeFaydaCodeForToken(code)
    const decodedUserInfo = await getUserInfo(token.access_token)

    // CRITICAL: Ensure all required fields from Fayda are present
    if (!decodedUserInfo || !decodedUserInfo.sub || !decodedUserInfo.email || !decodedUserInfo.name) {
      console.error("User info is incomplete or missing required fields from Fayda:", decodedUserInfo)
      throw new Error("User info is incomplete or missing required fields from Fayda (sub, email, or name)")
    }

    console.log("Decoded User Info from Fayda:", decodedUserInfo)

    const userIdentifier = decodedUserInfo.sub
    console.log("Attempting to find/update user with Fayda ID:", userIdentifier)

    // Prepare data for upsert. Ensure all required schema fields are present.
    const updateData = {
      faydaId: userIdentifier, // This is the unique identifier from Fayda
      name: decodedUserInfo.name,
      email: decodedUserInfo.email,
      isValidate: true,
    }

    const updatedUser = await User.findOneAndUpdate(
      { faydaId: userIdentifier }, // CRITICAL: Query by the unique Fayda ID
      { $set: updateData }, // CRITICAL: Set all necessary fields for upsert
      { new: true, upsert: true, runValidators: true }, // CRITICAL: Enable upsert and run validators
    )

    if (!updatedUser) {
      console.error("Failed to find or create user in DB for Fayda ID:", userIdentifier)
      throw new Error("Failed to process user in DB after Fayda authentication")
    }

    console.log("User successfully found/created/updated in DB:", updatedUser)

    return NextResponse.json(
      { success: true, message: "Successfully validated user", user: updatedUser },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("Fayda auth error during user update:", error)
    return NextResponse.json({ error: "Authentication failed", details: error.message }, { status: 500 })
  }
}
