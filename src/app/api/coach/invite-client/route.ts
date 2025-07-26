import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id || session.user.role !== "COACH") {
      return NextResponse.json(
        { error: "Unauthorized - Coach access required" },
        { status: 401 }
      )
    }

    const { email, name, message, coachId } = await request.json()

    // Validate input
    if (!email || !name || !coachId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Verify the coachId matches the authenticated user
    if (coachId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid coach ID" },
        { status: 403 }
      )
    }

    // Check if user already exists
    let client = await prisma.user.findUnique({
      where: { email }
    })

    // If user doesn't exist, create a placeholder client record
    if (!client) {
      client = await prisma.user.create({
        data: {
          email,
          name,
          role: "CLIENT",
          isActive: false, // Will be activated when they complete signup
        }
      })
    }

    // Check if relationship already exists
    const existingRelationship = await prisma.clientRelationship.findFirst({
      where: {
        coachId,
        clientId: client.id
      }
    })

    if (existingRelationship) {
      return NextResponse.json(
        { error: "Client is already connected to your coaching practice" },
        { status: 400 }
      )
    }

    // Create the client relationship
    const relationship = await prisma.clientRelationship.create({
      data: {
        coachId,
        clientId: client.id,
        status: "pending"
      }
    })

    // In a real application, you would send an email invitation here
    // For now, we'll just simulate the invitation being sent
    console.log(`Invitation sent to ${email}:`)
    console.log(`Name: ${name}`)
    console.log(`Coach ID: ${coachId}`)
    console.log(`Message: ${message || 'No custom message'}`)
    console.log(`Invitation link: ${process.env.NEXTAUTH_URL}/auth/signup?invite=${relationship.id}`)

    return NextResponse.json(
      { 
        message: "Invitation sent successfully",
        relationship: {
          id: relationship.id,
          clientEmail: email,
          clientName: name,
          status: "pending"
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Invite client error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 