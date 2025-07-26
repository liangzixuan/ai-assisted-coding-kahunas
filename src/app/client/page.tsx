import Link from "next/link";
import { requireRole } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import UserMenu from "@/components/auth/user-menu";

export default async function ClientPortal() {
  // Require client authentication
  const user = await requireRole("CLIENT");

  // Fetch real data from database
  const [
    coachRelationship,
    recentSessions,
    recentMessages,
    progressData
  ] = await Promise.all([
    // Get coach relationship
    prisma.clientRelationship.findFirst({
      where: { 
        clientId: user.id,
        status: "active"
      },
      include: {
        coach: {
          select: {
            id: true,
            name: true,
            email: true,
            bio: true
          }
        }
      }
    }),
    
    // Recent sessions (mock for now - will be real when session model is added)
    Promise.resolve([
      {
        id: 1,
        date: new Date().toLocaleDateString(),
        type: "60-min Standard Session",
        notes: "Great progress on goal setting. Continue with action items.",
        hasFiles: false
      }
    ]),
    
    // Recent messages (mock for now - will be real when messaging is added)
    Promise.resolve([
      {
        id: 1,
        from: user.name || "You",
        message: "Looking forward to our next session!",
        time: "1 day ago",
        hasAttachment: false
      }
    ]),
    
    // Progress data (mock for now - will be real when progress tracking is added)
    Promise.resolve({
      sessionsCompleted: 1,
      totalSessions: 10,
      goalsAchieved: 1,
      totalGoals: 5
    })
  ]);

  // Mock next appointment (will be real when appointment model is added)
  const nextAppointment = coachRelationship ? {
    id: 1,
    coachName: coachRelationship.coach.name || "Your Coach",
    time: "No upcoming sessions",
    type: "Book your next session",
    meetingLink: "#",
    status: "pending"
  } : null;

  const availableSlots = [
    "Tomorrow, 10:00 AM",
    "Thu, 2:00 PM", 
    "Fri, 11:00 AM",
    "Mon, 9:00 AM"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">Kahunas</span>
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-lg font-medium text-gray-700">Client Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.447L3 21l2.447-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                </svg>
                <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full"></span>
              </button>
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <Link href="/client" className="px-3 py-4 text-blue-600 border-b-2 border-blue-600 font-medium">
              Dashboard
            </Link>
            <Link href="/client/booking" className="px-3 py-4 text-gray-500 hover:text-gray-700">
              Book Session
            </Link>
            <Link href="/client/history" className="px-3 py-4 text-gray-500 hover:text-gray-700">
              Session History
            </Link>
            <Link href="/client/messages" className="px-3 py-4 text-gray-500 hover:text-gray-700">
              Messages
            </Link>
            <Link href="/client/resources" className="px-3 py-4 text-gray-500 hover:text-gray-700">
              Resources
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name?.split(' ')[0] || "Client"}!
          </h1>
          <p className="text-gray-600">Ready for your coaching journey? Here&apos;s your latest update.</p>
        </div>

        {/* No Coach Warning */}
        {!coachRelationship && (
          <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-lg font-medium text-yellow-800">No Coach Assigned</h3>
                <p className="text-yellow-700">You haven't been assigned to a coach yet. Contact your coach to get started with your coaching journey.</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Next Appointment */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  {coachRelationship ? "Next Appointment" : "Get Started"}
                </h2>
              </div>
              <div className="p-6">
                {coachRelationship ? (
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">
                          {coachRelationship.coach.name?.split(' ').map((n: string) => n[0]).join('') || 'C'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{nextAppointment?.coachName}</p>
                        <p className="text-sm text-gray-600">{nextAppointment?.type}</p>
                        <p className="text-lg font-medium text-blue-700 mt-1">{nextAppointment?.time}</p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link 
                        href="/client/booking"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                      >
                        Book Session
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Connect with a Coach</h3>
                    <p className="text-gray-600 mb-4">Start your coaching journey by connecting with a professional coach.</p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Find a Coach
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Sessions</h2>
                  <Link href="/client/history" className="text-blue-600 hover:text-blue-700 text-sm">
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {recentSessions.length > 0 ? (
                  <div className="space-y-4">
                    {recentSessions.map((session: any) => (
                      <div key={session.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-900">{session.date}</span>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {session.type}
                            </span>
                            {session.hasFiles && (
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                Has Files
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{session.notes}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No sessions yet</p>
                    {coachRelationship && (
                      <Link 
                        href="/client/booking"
                        className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
                      >
                        Book your first session
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Book */}
            {coachRelationship && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">Quick Book</h2>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-4">Available slots this week:</p>
                  <div className="space-y-2">
                    {availableSlots.slice(0, 3).map((slot, index) => (
                      <button 
                        key={index}
                        className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  <Link 
                    href="/client/booking"
                    className="block text-center text-blue-600 hover:text-blue-700 text-sm mt-4 font-medium"
                  >
                    See all available times
                  </Link>
                </div>
              </div>
            )}

            {/* Coach Info */}
            {coachRelationship && (
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">Your Coach</h2>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {coachRelationship.coach.name?.split(' ').map((n: string) => n[0]).join('') || 'C'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{coachRelationship.coach.name}</p>
                      <p className="text-sm text-gray-500">{coachRelationship.coach.email}</p>
                    </div>
                  </div>
                  {coachRelationship.coach.bio && (
                    <p className="text-sm text-gray-600 mb-4">{coachRelationship.coach.bio}</p>
                  )}
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            )}

            {/* Progress Summary */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Progress Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Sessions Completed</span>
                      <span className="text-sm font-bold text-gray-900">
                        {progressData.sessionsCompleted}/{progressData.totalSessions}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${(progressData.sessionsCompleted / progressData.totalSessions) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Goals Achieved</span>
                      <span className="text-sm font-bold text-gray-900">
                        {progressData.goalsAchieved}/{progressData.totalGoals}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{width: `${(progressData.goalsAchieved / progressData.totalGoals) * 100}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <span className="font-medium">Welcome!</span> You&apos;re just getting started on your coaching journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        {coachRelationship && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Action Items</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Complete welcome survey</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Set initial goals with coach</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" checked />
                    <span className="text-sm text-gray-700 line-through">Complete profile setup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 