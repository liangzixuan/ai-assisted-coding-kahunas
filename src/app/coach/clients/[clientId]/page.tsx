import Link from "next/link";
import { requireRole } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import UserMenu from "@/components/auth/user-menu";
import { notFound } from "next/navigation";

interface ClientDetailPageProps {
  params: {
    clientId: string
  }
}

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  // Require coach authentication
  const user = await requireRole("COACH");

  // Fetch client relationship and verify access
  const relationship = await prisma.clientRelationship.findFirst({
    where: {
      coachId: user.id,
      clientId: params.clientId
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          bio: true,
          phoneNumber: true,
          timeZone: true,
          createdAt: true,
          isActive: true
        }
      }
    }
  });

  if (!relationship) {
    notFound();
  }

  const { client, status, createdAt } = relationship;

  // Mock data for session history and progress (will be real when models are added)
  const sessionHistory = [
    {
      id: 1,
      date: "2024-01-15",
      type: "60-min Standard Session",
      status: "completed",
      notes: "Great progress on goal setting. Discussed career transition strategies."
    },
    {
      id: 2,
      date: "2024-01-08",
      type: "Initial Consultation",
      status: "completed",
      notes: "Introduction session. Identified key areas for development."
    }
  ];

  const progressMetrics = {
    totalSessions: sessionHistory.length,
    completedGoals: 3,
    totalGoals: 5,
    satisfactionScore: 4.8
  };

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
            <Link href="/coach" className="px-3 py-4 text-gray-500 hover:text-gray-700">
              Dashboard
            </Link>
            <Link href="/coach/clients" className="px-3 py-4 text-blue-600 border-b-2 border-blue-600 font-medium">
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
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/coach/clients" className="hover:text-gray-700">Clients</Link>
          <span>/</span>
          <span className="text-gray-900">{client.name || client.email}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Profile */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Client Profile</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-xl">
                      {client.name ? client.name.split(' ').map((n: string) => n[0]).join('') : client.email[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {client.name || "Name not provided"}
                    </h3>
                    <p className="text-gray-600 mb-2">{client.email}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Client since {new Date(createdAt).toLocaleDateString()}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        status === 'active' ? 'bg-green-100 text-green-800' :
                        status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                    {client.bio && (
                      <p className="text-gray-700 mt-3">{client.bio}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Email:</span>
                        <span className="text-gray-900">{client.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Phone:</span>
                        <span className="text-gray-900">{client.phoneNumber || "Not provided"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Time Zone:</span>
                        <span className="text-gray-900">{client.timeZone || "Not specified"}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Progress Overview</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Total Sessions:</span>
                        <span className="text-gray-900">{progressMetrics.totalSessions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Goals Completed:</span>
                        <span className="text-gray-900">{progressMetrics.completedGoals}/{progressMetrics.totalGoals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Satisfaction:</span>
                        <span className="text-gray-900">{progressMetrics.satisfactionScore}/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Session History */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Session History</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Schedule Session
                  </button>
                </div>
              </div>
              <div className="p-6">
                {sessionHistory.length > 0 ? (
                  <div className="space-y-4">
                    {sessionHistory.map((session: any) => (
                      <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-gray-900">
                              {new Date(session.date).toLocaleDateString()}
                            </span>
                            <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {session.type}
                            </span>
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              session.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {session.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{session.notes}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No sessions yet</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm">
                      Schedule the first session
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Schedule Session
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  Create Invoice
                </button>
                <hr className="my-3" />
                {status === 'active' ? (
                  <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                    Deactivate Client
                  </button>
                ) : status === 'pending' ? (
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Resend Invitation
                  </button>
                ) : (
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Reactivate Client
                  </button>
                )}
              </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Progress Summary</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Session Progress</span>
                      <span className="text-gray-900">{progressMetrics.totalSessions}/15</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${(progressMetrics.totalSessions / 15) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Goals Achieved</span>
                      <span className="text-gray-900">{progressMetrics.completedGoals}/{progressMetrics.totalGoals}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{width: `${(progressMetrics.completedGoals / progressMetrics.totalGoals) * 100}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="text-center pt-4 border-t">
                    <div className="text-2xl font-bold text-blue-600">{progressMetrics.satisfactionScore}</div>
                    <div className="text-sm text-gray-600">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 