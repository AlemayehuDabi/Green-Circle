import { NextRequest, NextResponse } from 'next/server';
import { exchangeFaydaCodeForToken, getUserInfo } from '@/lib/fayda';
import { connectToDB } from '@/lib/db';
import { User } from '@/models/user';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) return NextResponse.redirect(new URL('/submit/verify', req.url));

  try {
    await connectToDB();

    const token = await exchangeFaydaCodeForToken(code);
    const user = await getUserInfo(token.access_token);

    if (!user || !user.name) {
      throw new Error('User info is incomplete from Fayda');
    }

    console.log('User info from Fayda:', user);

    const updatedUser = await User.findOneAndUpdate(
      { name: user.name },
      { isValidate: true },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('User not found in DB');
    }

<<<<<<< HEAD
    return NextResponse.json({
      success: true,
      message: 'Successfully validated user',
    });
=======
    return NextResponse.json({ success: true, message: 'Successfully validated user' });
>>>>>>> bbf5d25f2b17a85344da35d60882a33f993f167e
  } catch (err) {
    console.error('Fayda auth error:', err);
 return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
