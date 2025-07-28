import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/coach/appointments/[id] - Get a specific appointment
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

    const appointment = await prisma.appointment.findFirst({
      where: {
        id: params.id,
        coachId: user.id
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

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/coach/appointments/[id] - Update an appointment
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
    const { date, startTime, endTime, duration, type, status, notes } = body;

    // Check if appointment exists and belongs to this coach
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        id: params.id,
        coachId: user.id
      }
    });

    if (!existingAppointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // Check for time conflicts with other appointments
    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        coachId: user.id,
        date: date || existingAppointment.date,
        id: {
          not: params.id
        },
        OR: [
          {
            startTime: {
              lt: endTime || existingAppointment.endTime
            },
            endTime: {
              gt: startTime || existingAppointment.startTime
            }
          }
        ]
      }
    });

    if (conflictingAppointment) {
      return NextResponse.json({ error: 'Time slot conflicts with existing appointment' }, { status: 409 });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: params.id
      },
      data: {
        date: date || existingAppointment.date,
        startTime: startTime || existingAppointment.startTime,
        endTime: endTime || existingAppointment.endTime,
        duration: duration || existingAppointment.duration,
        type: type || existingAppointment.type,
        status: status || existingAppointment.status,
        notes: notes !== undefined ? notes : existingAppointment.notes
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

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/coach/appointments/[id] - Delete an appointment
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

    // Check if appointment exists and belongs to this coach
    const appointment = await prisma.appointment.findFirst({
      where: {
        id: params.id,
        coachId: user.id
      }
    });

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    await prisma.appointment.delete({
      where: {
        id: params.id
      }
    });

    return NextResponse.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 