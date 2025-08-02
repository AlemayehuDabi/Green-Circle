import { type NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { User } from '@/models/user';
import { z } from 'zod';
import { StartupZodSchema } from '@/zod-validator/validator';
import { Startup } from '@/models/start-up';

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const { formData, email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    const user = await User.findOne({
      email: "chere@id.et",
    });


    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    if (!user.faydaId || !user.isValidate) {
      return NextResponse.json(
        { error: 'Fayda ID verification required.' },
        { status: 403 }
      );
    }

    // Validate formData
    try {
      StartupZodSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Invalid form data', details: error.flatten().fieldErrors },
          { status: 400 }
        );
      }
      throw error;
    }
    console.log("let seeee", formData.name)
    // Create startup document
    const startup = new Startup({
      userId: user._id,
      name: formData.founderName,
      startupName: formData.startupName,
      website: formData.website,
      sector: formData.sector,
      location: formData.location,
      description: formData.description,
      founderName: formData.founderName,
      founderRole: formData.founderRole,
      pitch: formData.pitch,
      startupLaw: formData.startupLaw,
      status: 'pending',
    });

    await startup.save();

    // Update user's role to 'startup'
    await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { role: 'startup' } },
      { runValidators: true }
    );

    return NextResponse.json(
      { success: true, message: 'Startup submitted successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error submitting startup:', error);
    return NextResponse.json(
      { error: 'Submission failed', details: error.message },
      { status: 500 }
    );
  }
}
