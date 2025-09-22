import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/db';
import { IUser, User } from '@/models/user';
import { z } from 'zod';
import { StartupZodSchema } from '@/zod-validator/validator';
import { Startup } from '@/models/start-up';

// post start-up
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
      email,
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
    // Create startup document
    const startup = new Startup({
      name: formData.startupName,
      website: formData.website || '',
      sector: formData.sector || '',
      location: formData.location,
      foundedYear: formData.foundedYear || '',
      employees: formData.employees || '',
      description: formData.description,
      pitch: formData.pitch || '',
      achievements: formData.achievements || '',
      documents: [],
      founderRole: formData.founderRole || '',
      founderEmail: email,
      founderPhone: formData.founderPhone || '',
      founderBio: formData.founderBio || '',
      revenue: formData.revenue || '',
      founders: [user._id],
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

// get all start-up
// get all startups + dashboard stats
export async function GET() {
  try {
    await connectToDB();

    const startups = await Startup.find({}).populate<{ founders: IUser[] }>({
      path: 'founders',
      model: 'User',
      select: 'name email role isValidate faydaId phone_number nationality bio',
    });

    const totalStartups = startups.length;
    const verifiedStartups = startups.filter(s => s.status === 'approved').length;
    const pendingVerifications = startups.filter(s => s.status === 'pending').length;
    const totalInvestment = startups.reduce((sum, s) => sum + (parseInt(s.revenue || '0') || 0), 0);
    const activeInvestors = 20; // hardcoded or compute if you track investors
    const jobsCreated = 1000;   // hardcoded or compute from a field
    const monthlyGrowth = 7;    // hardcoded or compute based on `createdAt`

    const sectors = Array.from(
      startups.reduce((map, startup) => {
        const sector = startup.sector || 'Other';
        const current = map.get(sector) || 0;
        return map.set(sector, current + 1);
      }, new Map<string, number>())
    ).map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalStartups) * 100),
    }));

    const activities = startups.slice(0, 5).map((s) => ({
      action: s.status === 'approved' ? 'Approved Startup' : 'New Startup Registered',
      entity: s.name,
      time: s.createdAt?.toLocaleString() || '',
    }));

    const approved = startups.filter(s => s.status === 'approved').length;
const successRate = totalStartups ? Math.round((approved / totalStartups) * 100) : 0;

const uniqueRegions = new Set(startups.map(s => s.location?.trim().toLowerCase()));
const regionsActive = uniqueRegions.size;

return NextResponse.json({
  stats: {
    totalStartups,
    verifiedStartups: approved,
    pendingVerifications,
    totalInvestment,
    activeInvestors,
    jobsCreated,
    monthlyGrowth,
    successRate,
    regionsActive
  },
  sectors,
  activities,
  startups
});




    
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'fetching dashboard data failed',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// delete start-up
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

// patch start-up
export async function PATCH(request: NextRequest) {
  try {
    const { startupId } = await request.json();

    if (!startupId) {
      return NextResponse.json(
        { error: '`startupId` is required' },
        { status: 400 }
      );
    }

    await connectToDB();

    const approved = await Startup.findByIdAndUpdate(
      startupId,
      { status: 'approved' },
      { new: true }
    );

    if (!approved) {
      return NextResponse.json(
        { error: 'Start-up not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Start-up approved successfully',
        approved,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to approve start-up',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
