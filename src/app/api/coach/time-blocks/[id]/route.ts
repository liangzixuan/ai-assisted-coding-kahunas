import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/coach/time-blocks/[id] - Get a specific time block
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user || user.role !== 'COACH') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const timeBlock = await prisma.timeBlock.findFirst({
      where: {
        id: params.id,
        coachId: user.id
      }
    });

    if (!timeBlock) {
      return NextResponse.json({ error: 'Time block not found' }, { status: 404 });
    }

    return NextResponse.json(timeBlock);
  } catch (error) {
    console.error('Error fetching time block:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/coach/time-blocks/[id] - Update a time block
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user || user.role !== 'COACH') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { date, startTime, endTime, type, title, description } = body;

    // Check if time block exists and belongs to this coach
    const existingTimeBlock = await prisma.timeBlock.findFirst({
      where: {
        id: params.id,
        coachId: user.id
      }
    });

    if (!existingTimeBlock) {
      return NextResponse.json({ error: 'Time block not found' }, { status: 404 });
    }

    // Check for time conflicts with other time blocks
    const conflictingTimeBlock = await prisma.timeBlock.findFirst({
      where: {
        coachId: user.id,
        date: date || existingTimeBlock.date,
        id: {
          not: params.id
        },
        OR: [
          {
            startTime: {
              lt: endTime || existingTimeBlock.endTime
            },
            endTime: {
              gt: startTime || existingTimeBlock.startTime
            }
          }
        ]
      }
    });

    if (conflictingTimeBlock) {
      return NextResponse.json({ error: 'Time slot conflicts with existing time block' }, { status: 409 });
    }

    // Check for conflicts with appointments
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        coachId: user.id,
        date: date || existingTimeBlock.date,
        OR: [
          {
            startTime: {
              lt: endTime || existingTimeBlock.endTime
            },
            endTime: {
              gt: startTime || existingTimeBlock.startTime
            }
          }
        ]
      }
    });

    if (conflictingAppointment) {
      return NextResponse.json({ error: 'Time slot conflicts with existing appointment' }, { status: 409 });
    }

    const updatedTimeBlock = await prisma.timeBlock.update({
      where: {
        id: params.id
      },
      data: {
        date: date || existingTimeBlock.date,
        startTime: startTime || existingTimeBlock.startTime,
        endTime: endTime || existingTimeBlock.endTime,
        type: type || existingTimeBlock.type,
        title: title || existingTimeBlock.title,
        description: description !== undefined ? description : existingTimeBlock.description
      }
    });

    return NextResponse.json(updatedTimeBlock);
  } catch (error) {
    console.error('Error updating time block:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/coach/time-blocks/[id] - Delete a time block
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user || user.role !== 'COACH') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Check if time block exists and belongs to this coach
    const timeBlock = await prisma.timeBlock.findFirst({
      where: {
        id: params.id,
        coachId: user.id
      }
    });

    if (!timeBlock) {
      return NextResponse.json({ error: 'Time block not found' }, { status: 404 });
    }

    await prisma.timeBlock.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({ message: 'Time block deleted successfully' });
  } catch (error) {
    console.error('Error deleting time block:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 