import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { User } from '@/models/user';

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, phone, bio } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectToDB();

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, phone_number: phone, bio },
      { new: true }
    );

    console.log('updated user', updatedUser);

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
