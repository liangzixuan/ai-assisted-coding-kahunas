import Link from "next/link";
import { requireRole } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import EnhancedDashboardAnalytics from "@/components/coach/enhanced-dashboard-analytics";
import DashboardLayout from "@/components/layouts/dashboard-layout";

export default async function CoachDashboard() {
  // Require coach authentication
  const user = await requireRole("COACH");

  // Fetch real data from database
  const [
    clientsCount,
    todaySessions,
    unreadMessagesCount,
    monthlyRevenue,
    upcomingAppointments,
    recentActivity
  ] = await Promise.all([
    // Count active clients
    prisma.clientRelationship.count({
      where: { 
        coachId: user.id,
        status: "active"
      }
    }),
    
    // Count today's sessions (mock for now - will be real when session model is added)
    Promise.resolve(3),
    
    // Count unread messages (mock for now - will be real when messaging is added) 
    Promise.resolve(5),
    
    // Monthly revenue (mock for now - will be real when payment model is added)
    Promise.resolve(4280),
    
    // Get upcoming appointments (mock data - replace when appointment model is added)
    Promise.resolve([
      {
        id: 1,
        clientName: "Demo Client",
        time: "Today, 2:00 PM",
        type: "60-min Standard Session",
        status: "confirmed"
      }
    ]),
    
    // Recent activity (mock data - replace when activity model is added)
    Promise.resolve([
      {
        id: 1,
        type: "session_completed",
        clientName: "Demo Client",
        action: "completed session",
        time: "2 hours ago"
      }
    ])
  ]);

  // Get actual client relationships
  const clientRelationships = await prisma.clientRelationship.findMany({
    where: { 
      coachId: user.id,
      status: "active"
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 3
  });

  return (
    <DashboardLayout 
      title={`Welcome back, ${user.name || "Coach"}!`}
      subtitle="Here's what's happening with your coaching practice today"
    >
      {/* Enhanced Analytics Dashboard */}
      <div className="mb-8">
        <EnhancedDashboardAnalytics 
          todaySessions={todaySessions}
          clientsCount={clientsCount}
          monthlyRevenue={monthlyRevenue}
          clientSatisfaction={4.8}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Appointments</h2>
                <Link href="/coach/calendar" className="text-yellow-600 hover:text-yellow-700 text-sm">
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {appointment.clientName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{appointment.clientName}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{appointment.time}</p>
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">No upcoming appointments</p>
                  <Link 
                    href="/coach/calendar"
                    className="text-yellow-600 hover:text-yellow-700 text-sm mt-2 inline-block"
                  >
                    Schedule a session
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity & Client List */}
        <div className="space-y-6">
          {/* Active Clients */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Clients</h2>
            </div>
            <div className="p-6">
              {clientRelationships.length > 0 ? (
                <div className="space-y-4">
                  {clientRelationships.map((relationship: any) => (
                    <div key={relationship.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {relationship.client.name?.split(' ').map((n: string) => n[0]).join('') || 'C'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {relationship.client.name || relationship.client.email}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Client since {new Date(relationship.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No clients yet</p>
                  <Link 
                    href="/coach/clients"
                    className="text-yellow-600 hover:text-yellow-700 text-sm mt-1 inline-block"
                  >
                    Invite your first client
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'session_completed' ? 'bg-green-100 dark:bg-green-900/20' :
                      activity.type === 'new_booking' ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-orange-100 dark:bg-orange-900/20'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'session_completed' ? 'bg-green-600' :
                        activity.type === 'new_booking' ? 'bg-blue-600' : 'bg-orange-600'
                      }`}></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        <span className="font-medium">{activity.clientName}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link 
              href="/coach/clients"
              className="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
            >
              <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm font-medium text-yellow-900 dark:text-yellow-300">Add New Client</span>
            </Link>
            
            <Link 
              href="/coach/calendar"
              className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-green-900 dark:text-green-300">Block Time</span>
            </Link>
            
            <button className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium text-purple-900 dark:text-purple-300">Create Invoice</span>
            </button>
            
            <Link 
              href="/coach/settings"
              className="flex items-center space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
            >
              <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium text-orange-900 dark:text-orange-300">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 