import { connectToDB } from '@/lib/db';
import { Startup } from '@/models/start-up';
import { IUser } from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    await connectToDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: '`startupId` is required' },
        { status: 400 }
      );
    }

    const startup = await Startup.findById(id).populate<{ founders: IUser[] }>({
      path: 'founders',
      model: 'User',
      select: 'name email role isValidate faydaId phone_number nationality bio',
    });

    if (!startup) {
      return NextResponse.json(
        { error: 'Start-up not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Startup information retrieved successfully.',
      startup,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Retriving startup data failed',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: '`startupId` is required' },
        { status: 400 }
      );
    }

    const data = req.json();

    const startup = Startup.findByIdAndUpdate(id, data).populate<{
      founders: IUser[];
    }>({
      path: 'founders',
      model: 'User',
      select: 'name email role isValidate faydaId phone_number nationality bio',
    });

    if (!startup) {
      return NextResponse.json(
        { error: 'Start-up not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Startup updated successfully.',
        startup,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Updating startup data failed',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// delete start-up
export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: '`startupId` is required' },
        { status: 400 }
      );
    }

    await connectToDB();

    const deleted = await Startup.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Start-up not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Start-up rejected (deleted) successfully', startupid: id },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to reject start-up', details: error.message },
      { status: 500 }
    );
  }
}
