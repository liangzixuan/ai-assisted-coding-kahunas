import Link from "next/link";

export default function ClientPortal() {
  // Mock data for demonstration
  const nextAppointment = {
    id: 1,
    coachName: "Alex Thompson",
    time: "Today, 2:00 PM",
    type: "60-min Standard Session",
    meetingLink: "https://kahunas.com/session/abc123",
    status: "confirmed"
  };

  const recentSessions = [
    {
      id: 1,
      date: "Jan 15, 2024",
      type: "60-min Standard Session",
      notes: "Great progress on goal setting. Action items: 1) Complete career assessment, 2) Update LinkedIn profile",
      hasFiles: true
    },
    {
      id: 2,
      date: "Jan 8, 2024",
      type: "Initial Consultation",
      notes: "Introduction session. Identified key areas for development.",
      hasFiles: false
    },
    {
      id: 3,
      date: "Jan 1, 2024",
      type: "Goal Planning Session",
      notes: "Set quarterly goals and created action plan for Q1.",
      hasFiles: true
    }
  ];

  const recentMessages = [
    {
      id: 1,
      from: "Alex Thompson",
      message: "Here's the worksheet we discussed. Please complete it before our next session.",
      time: "2 hours ago",
      hasAttachment: true
    },
    {
      id: 2,
      from: "You",
      message: "Thanks for the great session today. I'll work on the action items we discussed.",
      time: "1 day ago",
      hasAttachment: false
    }
  ];

  const availableSlots = [
    "Tomorrow, 10:00 AM",
    "Thu, Jan 25, 2:00 PM",
    "Fri, Jan 26, 11:00 AM",
    "Mon, Jan 29, 9:00 AM"
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">B</span>
                </div>
                <span className="text-gray-700">Ben Rodriguez</span>
              </div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Ben!</h1>
          <p className="text-gray-600">Ready for your coaching journey? Here&apos;s your latest update.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Next Appointment */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Next Appointment</h2>
              </div>
              <div className="p-6">
                {nextAppointment ? (
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">AT</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{nextAppointment.coachName}</p>
                        <p className="text-sm text-gray-600">{nextAppointment.type}</p>
                        <p className="text-lg font-medium text-blue-700 mt-1">{nextAppointment.time}</p>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Join Session
                      </button>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        Reschedule
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No upcoming appointments</p>
                    <Link 
                      href="/client/booking"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                    >
                      Book Your Next Session
                    </Link>
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
                <div className="space-y-4">
                  {recentSessions.map((session) => (
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
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Book */}
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

            {/* Recent Messages */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
                  <Link href="/client/messages" className="text-blue-600 hover:text-blue-700 text-sm">
                    View all
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{message.from}</span>
                        <span className="text-xs text-gray-500">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{message.message}</p>
                      {message.hasAttachment && (
                        <div className="flex items-center space-x-1 text-xs text-blue-600">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          <span>Attachment</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
              </div>
            </div>

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
                      <span className="text-sm font-bold text-gray-900">12/15</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Goals Achieved</span>
                      <span className="text-sm font-bold text-gray-900">7/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '70%'}}></div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <span className="font-medium">Great progress!</span> You&apos;re on track to complete your goals this quarter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Action Items</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Complete career assessment worksheet</span>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Update LinkedIn profile with new summary</span>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <input type="checkbox" className="w-4 h-4 text-blue-600" checked />
                  <span className="text-sm text-gray-700 line-through">Schedule informational interviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 