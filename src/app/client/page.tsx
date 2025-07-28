import Link from "next/link";
import { requireRole } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ClientDashboardAnalytics from "@/components/client/client-dashboard-analytics";

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
    <DashboardLayout 
      title={`Welcome back, ${user.name?.split(' ')[0] || "Client"}!`}
      subtitle="Here's your coaching journey overview and next steps"
      role="CLIENT"
    >
      {/* No Coach Warning */}
      {!coachRelationship && (
        <div className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">No Coach Assigned</h3>
              <p className="text-yellow-700 dark:text-yellow-300">You haven't been assigned to a coach yet. Contact your coach to get started with your coaching journey.</p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Analytics Dashboard */}
      <div className="mb-8">
        <ClientDashboardAnalytics 
          sessionsCompleted={progressData.sessionsCompleted}
          totalSessions={progressData.totalSessions}
          goalsAchieved={progressData.goalsAchieved}
          totalGoals={progressData.totalGoals}
          nextSessionDate={nextAppointment?.time}
          coachName={coachRelationship?.coach.name || undefined}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Appointment */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {coachRelationship ? "Next Appointment" : "Get Started"}
              </h2>
            </div>
            <div className="p-6">
              {coachRelationship ? (
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {coachRelationship.coach.name?.split(' ').map((n: string) => n[0]).join('') || 'C'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{nextAppointment?.coachName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{nextAppointment?.type}</p>
                      <p className="text-lg font-medium text-blue-700 dark:text-blue-400 mt-1">{nextAppointment?.time}</p>
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
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Connect with a Coach</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Start your coaching journey by connecting with a professional coach.</p>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Find a Coach
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Sessions</h2>
                <Link href="/client/history" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {recentSessions.length > 0 ? (
                <div className="space-y-4">
                  {recentSessions.map((session: any) => (
                    <div key={session.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{session.date}</span>
                          <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full">
                            {session.type}
                          </span>
                          {session.hasFiles && (
                            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full">
                              Has Files
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{session.notes}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No sessions yet</p>
                  {coachRelationship && (
                    <Link 
                      href="/client/booking"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm mt-2 inline-block"
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Book</h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Available slots this week:</p>
                <div className="space-y-2">
                  {availableSlots.slice(0, 3).map((slot, index) => (
                    <button 
                      key={index}
                      className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <Link 
                  href="/client/booking"
                  className="block text-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm mt-4 font-medium"
                >
                  See all available times
                </Link>
              </div>
            </div>
          )}

          {/* Coach Info */}
          {coachRelationship && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Coach</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {coachRelationship.coach.name?.split(' ').map((n: string) => n[0]).join('') || 'C'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{coachRelationship.coach.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{coachRelationship.coach.email}</p>
                  </div>
                </div>
                {coachRelationship.coach.bio && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{coachRelationship.coach.bio}</p>
                )}
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          )}

          {/* Action Items */}
          {coachRelationship && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Action Items</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Complete welcome survey</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Set initial goals with coach</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" checked />
                    <span className="text-sm text-gray-700 dark:text-gray-300 line-through">Complete profile setup</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link 
              href="/client/booking"
              className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Book Session</span>
            </Link>
            
            <Link 
              href="/client/messages"
              className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.447L3 21l2.447-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
              </svg>
              <span className="text-sm font-medium text-green-900 dark:text-green-300">Messages</span>
            </Link>
            
            <Link 
              href="/client/history"
              className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-sm font-medium text-purple-900 dark:text-purple-300">Session History</span>
            </Link>
            
            <Link 
              href="/client/resources"
              className="flex items-center space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
            >
              <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-sm font-medium text-orange-900 dark:text-orange-300">Resources</span>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 