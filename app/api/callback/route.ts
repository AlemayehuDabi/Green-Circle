import { type NextRequest, NextResponse } from 'next/server';
import { exchangeFaydaCodeForToken, getUserInfo } from '@/lib/fayda';
import { connectToDB } from '@/lib/db';
import { User } from '@/models/user';

export async function POST(request: NextRequest) {
  // const { searchParams } = request.nextUrl;
  const { code, codeVerifier, email } = await request.json();
  console.log('this is email from callback', email);

  if (!email) {
    return NextResponse.json(
      { error: 'email is not found in the callback' },
      { status: 400 }
    );
  }

  // console.log('this is the code', code, codeVerifier);

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

    // Ensure required Fayda fields are present
    if (
      !decodedUserInfo ||
      !decodedUserInfo.sub ||
      !decodedUserInfo.email ||
      !decodedUserInfo.name
    ) {
      // console.error('Missing required Fayda user fields:', decodedUserInfo);
      throw new Error('Missing Fayda user info (sub, email, or name)');
    }

    const userIdentifier = decodedUserInfo.sub;

    // Check if the Fayda ID is already associated with another user
    const faydaIdInUse = await User.findOne({ faydaId: userIdentifier });
    if (faydaIdInUse) {
      return NextResponse.json(
        { error: 'Fayda ID is already associated with another account', email },
        { status: 409 }
      );
    }

    console.log('Model collection name:', User.collection.name);

    // Update user by email
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          faydaId: userIdentifier,
          name: decodedUserInfo.name,
          isValidate: true,
          role: 'startup',
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found. Please sign up first.' },
        { status: 404 }
      );
    }

    console.log('User successfully updated:', updatedUser);

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully validated user',
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Fayda auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed', details: error.message },
      { status: 500 }
    );
  }
}
