'use client';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  gradient: string;
  isPositive?: boolean;
}

const AnalyticsCard = ({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon, 
  gradient,
  isPositive = true 
}: AnalyticsCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
            {icon}
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
              : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {isPositive ? (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l5-5 5 5" />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-5 5-5-5" />
              </svg>
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{value}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{changeLabel}</p>
        </div>

        {/* Mini chart placeholder */}
        <div className="mt-4 h-12 flex items-end space-x-1">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 bg-gradient-to-t ${gradient} opacity-30 rounded-sm`}
              style={{ height: `${20 + Math.random() * 30}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ClientDashboardAnalyticsProps {
  sessionsCompleted: number;
  totalSessions: number;
  goalsAchieved: number;
  totalGoals: number;
  nextSessionDate?: string;
  coachName?: string;
}

export default function ClientDashboardAnalytics({
  sessionsCompleted,
  totalSessions,
  goalsAchieved,
  totalGoals,
  nextSessionDate,
  coachName
}: ClientDashboardAnalyticsProps) {
  const sessionProgress = Math.round((sessionsCompleted / totalSessions) * 100);
  const goalProgress = Math.round((goalsAchieved / totalGoals) * 100);

  const analyticsData = [
    {
      title: "Sessions Completed",
      value: `${sessionsCompleted}/${totalSessions}`,
      change: 12.5,
      changeLabel: "vs last month",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-blue-500 to-blue-600",
      isPositive: true
    },
    {
      title: "Goals Achieved",
      value: `${goalsAchieved}/${totalGoals}`,
      change: 8.2,
      changeLabel: "progress this month",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: "from-green-500 to-emerald-500",
      isPositive: true
    },
    {
      title: "Session Progress",
      value: `${sessionProgress}%`,
      change: 15.3,
      changeLabel: "completion rate",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: "from-purple-500 to-purple-600",
      isPositive: true
    },
    {
      title: "Goal Progress",
      value: `${goalProgress}%`,
      change: 2.1,
      changeLabel: "achievement rate",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      gradient: "from-yellow-500 to-amber-500",
      isPositive: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Progress Overview</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your coaching journey and achievements</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Last 30 days
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
            View Report
          </button>
        </div>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((card, index) => (
          <AnalyticsCard key={index} {...card} />
        ))}
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {nextSessionDate ? `Next session: ${nextSessionDate}` : "Ready for your next session?"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {coachName ? `with ${coachName}` : "Book your next coaching session"}
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-400 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
              View Schedule
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors">
              Book Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 