import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { IUser, User } from '@/models/user';
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
      email: 'chere@id.et',
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
    console.log('let seeee', formData.name);
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

export async function GET() {
  try {
    await connectToDB();

    const startupProjection = {
      _id: 1,
      name: 1,
      founders: 1,
      sector: 1,
      createdAt: 1,
      employees: 1,
      revenue: 1,
      location: 1,
      status: 1,
    };

    // for the admin
    const startups = await Startup.find({})
      .select(startupProjection)
      .populate<{ founders: IUser[] }>({
        path: 'founders',
        model: 'User',
        select: 'name',
      })
      .lean()
      .exec(); // Explicitly call exec() for better type inference

    console.log('start admin', startups);

    return NextResponse.json(
      {
        success: true,
        message: 'data is fetched',
        startups,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'fetching start-up failed',
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { startupId } = await request.json();

    if (!startupId) {
      return NextResponse.json(
        { error: '`startupId` is required' },
        { status: 400 }
      );
    }

    await connectToDB();

    const deleted = await Startup.findByIdAndDelete(startupId);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Start-up not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Start-up rejected (deleted) successfully', data: deleted },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to reject start-up', details: error.message },
      { status: 500 }
    );
  }
}
