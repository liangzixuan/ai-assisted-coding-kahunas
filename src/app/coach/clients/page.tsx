import Link from "next/link";
import { requireRole } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import UserMenu from "@/components/auth/user-menu";
import InviteClientModal from "@/components/coach/invite-client-modal";
import ClientCard from "@/components/coach/client-card";

export default async function CoachClientsPage() {
  // Require coach authentication
  const user = await requireRole("COACH");

  // Fetch all client relationships for this coach
  const clientRelationships = await prisma.clientRelationship.findMany({
    where: { 
      coachId: user.id 
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          isActive: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  // Separate clients by status
  const activeClients = clientRelationships.filter((rel: any) => rel.status === "active");
  const pendingClients = clientRelationships.filter((rel: any) => rel.status === "pending");
  const inactiveClients = clientRelationships.filter((rel: any) => rel.status === "inactive");

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
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Clients
            </h1>
            <p className="text-gray-600">
              Manage your coaching relationships and track client progress
            </p>
          </div>
          <InviteClientModal coachId={user.id} />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{clientRelationships.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Clients</p>
                <p className="text-2xl font-bold text-gray-900">{activeClients.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Invites</p>
                <p className="text-2xl font-bold text-gray-900">{pendingClients.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">$3,240</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                </svg>
                Filter
              </button>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Client Sections */}
        {clientRelationships.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No clients yet</h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              Start building your coaching practice by inviting your first client. You can send them an invitation link to join your coaching program.
            </p>
            <InviteClientModal coachId={user.id} />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Active Clients */}
            {activeClients.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Active Clients ({activeClients.length})
                  </h2>
                </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {activeClients.map((relationship: any) => (
                     <ClientCard key={relationship.id} relationship={relationship} />
                   ))}
                 </div>
              </div>
            )}

            {/* Pending Invites */}
            {pendingClients.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Pending Invites ({pendingClients.length})
                  </h2>
                </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {pendingClients.map((relationship: any) => (
                     <ClientCard key={relationship.id} relationship={relationship} />
                   ))}
                 </div>
              </div>
            )}

            {/* Inactive Clients */}
            {inactiveClients.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Inactive Clients ({inactiveClients.length})
                  </h2>
                </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {inactiveClients.map((relationship: any) => (
                     <ClientCard key={relationship.id} relationship={relationship} />
                   ))}
                 </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 