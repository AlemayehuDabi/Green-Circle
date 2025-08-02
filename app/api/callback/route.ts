import { type NextRequest, NextResponse } from 'next/server';
import { exchangeFaydaCodeForToken, getUserInfo } from '@/lib/fayda';
import { connectToDB } from '@/lib/db';
import { User } from '@/models/user'; // Ensure this import is correct
import { Fayda } from '@/models/fayda';

export async function POST(request: NextRequest) {
  // const { searchParams } = request.nextUrl;
  const { code, codeVerifier } = await request.json();

  console.log('this is the code', code, codeVerifier);

  if (!code || !codeVerifier) {
    return NextResponse.json(
      { error: 'Missing code or codeVerifier' },
      { status: 400 }
    );
  }

  try {
    await connectToDB();
    const token = await exchangeFaydaCodeForToken(code, codeVerifier);
    const decodedUserInfo = await getUserInfo(token.access_token);

    // CRITICAL: Ensure all required fields from Fayda are present
    if (
      !decodedUserInfo ||
      !decodedUserInfo.sub ||
      !decodedUserInfo.email ||
      !decodedUserInfo.name
    ) {
      console.error(
        'User info is incomplete or missing required fields from Fayda:',
        decodedUserInfo
      );
      throw new Error(
        'User info is incomplete or missing required fields from Fayda (sub, email, or name)'
      );
    }

    const userIdentifier = decodedUserInfo.sub;
    const userEmail = decodedUserInfo.email;

    // // Find the user by email (from Better Auth signup)
    // const existingUser = await User.findOne({ email: userEmail });
    // if (!existingUser) {
    //   console.error('No user found with email:', userEmail);
    //   return NextResponse.json(
    //     { error: 'User not found. Please sign up first.' },
    //     { status: 404 }
    //   );
    // }

    // Check if the faydaId is already in use by another user
    // const faydaIdInUse = await User.findOne({ faydaId: userIdentifier });
    // if (faydaIdInUse && faydaIdInUse.email !== userEmail) {
    //   console.error('Fayda ID already in use by another user:', userIdentifier);
    //   return NextResponse.json(
    //     { error: 'Fayda ID is already associated with another account' },
    //     { status: 409 }
    //   );
    // }

    // Prepare data for update
    const updateData = {
      faydaId: userIdentifier,
      name: decodedUserInfo.name,
      email: userEmail,
      role: 'startup',
      isValidate: true,
    };

    // Update the user by email
    const faydaUser = await Fayda.create(updateData);

    if (!faydaUser) {
      console.error('Failed to create user with email:', userEmail);
      throw new Error('Failed to update user in database');
    }

    console.log('User successfully updated:', faydaUser);

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully validated user',
        user: faydaUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Fayda auth error during user update:', error);
    return NextResponse.json(
      { error: 'Authentication failed', details: error.message },
      { status: 500 }
    );
  }
}
