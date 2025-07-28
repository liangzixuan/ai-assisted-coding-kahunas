import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/coach/time-blocks - Get all time blocks for the coach
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        coachTimeBlocks: {
          orderBy: {
            date: 'asc'
          }
        }
      }
    });

    if (!user || user.role !== 'COACH') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(user.coachTimeBlocks);
  } catch (error) {
    console.error('Error fetching time blocks:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/coach/time-blocks - Create a new time block
export async function POST(request: NextRequest) {
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

    // Validate required fields
    if (!date || !startTime || !endTime || !type || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check for time conflicts with existing time blocks
    const conflictingTimeBlock = await prisma.timeBlock.findFirst({
      where: {
        coachId: user.id,
        date: date,
        OR: [
          {
            startTime: {
              lt: endTime
            },
            endTime: {
              gt: startTime
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
        date: date,
        OR: [
          {
            startTime: {
              lt: endTime
            },
            endTime: {
              gt: startTime
            }
          }
        ]
      }
    });

    if (conflictingAppointment) {
      return NextResponse.json({ error: 'Time slot conflicts with existing appointment' }, { status: 409 });
    }

    const timeBlock = await prisma.timeBlock.create({
      data: {
        coachId: user.id,
        date,
        startTime,
        endTime,
        type,
        title,
        description
      }
    });

    return NextResponse.json(timeBlock, { status: 201 });
  } catch (error) {
    console.error('Error creating time block:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 