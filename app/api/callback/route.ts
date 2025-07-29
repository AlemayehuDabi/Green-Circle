import { NextRequest, NextResponse } from 'next/server';
import { exchangeFaydaCodeForToken, getUserInfo } from '@/lib/fayda';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) return NextResponse.redirect('/login');

  try {
    const token = await exchangeFaydaCodeForToken(code);
    const user = await getUserInfo(token.access_token);

    // TODO: update isValidated

    return NextResponse.redirect('/dashboard');
  } catch (err) {
    console.error('Fayda auth error:', err);
    return NextResponse.redirect('/login?error=auth_failed');
  }
}
