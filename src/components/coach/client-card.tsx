"use client"

import { useState } from "react"
import Link from "next/link"

interface ClientCardProps {
  relationship: {
    id: string
    status: string
    createdAt: Date
    client: {
      id: string
      name: string | null
      email: string
      image: string | null
      createdAt: Date
      isActive: boolean
    }
  }
}

export default function ClientCard({ relationship }: ClientCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { client, status, createdAt } = relationship

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase()
    }
    return email[0].toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {getInitials(client.name, client.email)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {client.name || client.email}
              </h3>
              <p className="text-sm text-gray-500">{client.email}</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <Link
                  href={`/coach/clients/${client.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  View Details
                </Link>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Send Message
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  Schedule Session
                </button>
                <hr className="my-1" />
                {status === 'active' ? (
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Deactivate Client
                  </button>
                ) : status === 'pending' ? (
                  <button className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50">
                    Resend Invitation
                  </button>
                ) : (
                  <button className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50">
                    Reactivate Client
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(status)}`}>
              {status}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Client Since</span>
            <span className="text-sm text-gray-900">{formatDate(createdAt)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Last Session</span>
            <span className="text-sm text-gray-900">
              {status === 'pending' ? 'Never' : '2 days ago'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Total Sessions</span>
            <span className="text-sm text-gray-900">
              {status === 'pending' ? '0' : '12'}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Link
              href={`/coach/clients/${client.id}`}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm"
            >
              View Profile
            </Link>
            {status === 'active' && (
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm">
                Message
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 