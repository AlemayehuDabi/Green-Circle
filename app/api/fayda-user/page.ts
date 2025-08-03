import { NextResponse } from 'next/server';

export async function GET() {
  try {
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: 'failed to get user',
      error: error.message,
    });
  }
}
