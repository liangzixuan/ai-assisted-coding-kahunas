import Link from "next/link";
import { requireRole } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import UserMenu from "@/components/auth/user-menu";

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
              <span className="text-lg font-medium text-gray-700">Coach Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V12h5v5zM9 3H4l5-5 5 5H9v5H4V3z" />
                </svg>
                {unreadMessagesCount > 0 && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
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
            <Link href="/coach" className="px-3 py-4 text-blue-600 border-b-2 border-blue-600 font-medium">
              Dashboard
            </Link>
            <Link href="/coach/clients" className="px-3 py-4 text-gray-500 hover:text-gray-700">
              Clients
            </Link>
            <Link href="/coach/calendar" className="px-3 py-4 text-gray-500 hover:text-gray-700">
              Calendar
            </Link>
            <Link href="/coach/services" className="px-3 py-4 text-gray-500 hover:text-gray-700">
              Services
            </Link>
            <Link href="/coach/settings" className="px-3 py-4 text-gray-500 hover:text-gray-700">
              Settings
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name || "Coach"}!
          </h1>
          <p className="text-gray-600">Here&apos;s what&apos;s happening with your coaching practice today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today&apos;s Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{todaySessions}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">{clientsCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                <p className="text-2xl font-bold text-gray-900">{unreadMessagesCount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.447L3 21l2.447-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month&apos;s Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${monthlyRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
                  <Link href="/coach/calendar" className="text-blue-600 hover:text-blue-700 text-sm">
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {appointment.clientName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{appointment.clientName}</p>
                            <p className="text-sm text-gray-500">{appointment.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No upcoming appointments</p>
                    <Link 
                      href="/coach/calendar"
                      className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
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
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Recent Clients</h2>
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
                          <p className="text-sm font-medium text-gray-900">
                            {relationship.client.name || relationship.client.email}
                          </p>
                          <p className="text-xs text-gray-500">
                            Client since {new Date(relationship.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">No clients yet</p>
                    <Link 
                      href="/coach/clients"
                      className="text-blue-600 hover:text-blue-700 text-sm mt-1 inline-block"
                    >
                      Invite your first client
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'session_completed' ? 'bg-green-100' :
                        activity.type === 'new_booking' ? 'bg-blue-100' : 'bg-orange-100'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          activity.type === 'session_completed' ? 'bg-green-600' :
                          activity.type === 'new_booking' ? 'bg-blue-600' : 'bg-orange-600'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.clientName}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
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
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link 
                href="/coach/clients"
                className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm font-medium text-blue-900">Add New Client</span>
              </Link>
              
              <Link 
                href="/coach/calendar"
                className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-green-900">Block Time</span>
              </Link>
              
              <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium text-purple-900">Create Invoice</span>
              </button>
              
              <Link 
                href="/coach/settings"
                className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium text-orange-900">Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 