import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/coach/appointments - Get all appointments for the coach
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        coachAppointments: {
          include: {
            client: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          },
          orderBy: {
            date: 'asc'
          }
        }
      }
    });

    if (!user || user.role !== 'COACH') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(user.coachAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/coach/appointments - Create a new appointment
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
    const { clientId, date, startTime, endTime, duration, type, status, notes } = body;

    // Validate required fields
    if (!clientId || !date || !startTime || !endTime || !duration || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if client exists and is related to this coach
    const clientRelationship = await prisma.clientRelationship.findUnique({
      where: {
        coachId_clientId: {
          coachId: user.id,
          clientId: clientId
        }
      }
    });

    if (!clientRelationship) {
      return NextResponse.json({ error: 'Client not found or not related to coach' }, { status: 404 });
    }

    // Check for time conflicts
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

    const appointment = await prisma.appointment.create({
      data: {
        coachId: user.id,
        clientId,
        date,
        startTime,
        endTime,
        duration,
        type,
        status: status || 'PENDING',
        notes
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 