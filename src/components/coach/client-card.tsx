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

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          badge: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
          avatar: 'bg-gradient-to-r from-green-500 to-emerald-500'
        }
      case 'pending':
        return {
          badge: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
          avatar: 'bg-gradient-to-r from-yellow-500 to-amber-500'
        }
      case 'inactive':
        return {
          badge: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
          avatar: 'bg-gradient-to-r from-gray-500 to-gray-600'
        }
      default:
        return {
          badge: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
          avatar: 'bg-gradient-to-r from-blue-500 to-blue-600'
        }
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const statusConfig = getStatusConfig(status)

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${statusConfig.avatar}`}>
              <span className="text-white font-semibold text-sm">
                {getInitials(client.name, client.email)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {client.name || 'Unnamed Client'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{client.email}</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
                <Link
                  href={`/coach/clients/${client.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  View Details
                </Link>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Send Message
                </button>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Schedule Session
                </button>
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
                {status === 'active' ? (
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    Deactivate Client
                  </button>
                ) : status === 'pending' ? (
                  <button className="block w-full text-left px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    Resend Invitation
                  </button>
                ) : (
                  <button className="block w-full text-left px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                    Reactivate Client
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full capitalize ${statusConfig.badge}`}>
            <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75"></div>
            {status}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Since {formatDate(createdAt)}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Last Session</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {status === 'pending' ? 'Never' : '2 days ago'}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Sessions</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {status === 'pending' ? '0' : '12'}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-6">
        <div className="flex items-center space-x-2">
          <Link
            href={`/coach/clients/${client.id}`}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-2.5 px-4 rounded-xl transition-all duration-200 text-center text-sm font-medium shadow-sm hover:shadow-md"
          >
            View Profile
          </Link>
          {status === 'active' && (
            <button className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 py-2.5 px-4 rounded-xl transition-colors text-center text-sm font-medium">
              Message
            </button>
          )}
        </div>
      </div>

      {/* Overlay for click outside */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  )
} 