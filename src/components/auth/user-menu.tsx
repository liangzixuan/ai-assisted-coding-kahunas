"use client"

import { useState, useRef, useEffect } from "react"
import { signOut } from "next-auth/react"
import { useAuth } from "@/hooks/use-auth"

export default function UserMenu() {
  const { user, isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!isAuthenticated || !user) {
    return null
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const initials = user.name
    ?.split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase() || user.email?.[0]?.toUpperCase() || "U"

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-sm">{initials}</span>
        </div>
        <span className="text-gray-700 hidden sm:block">{user.name || user.email}</span>
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs text-blue-600 mt-1 capitalize">{user.role?.toLowerCase()}</p>
          </div>
          
          <button
            onClick={() => {
              setIsOpen(false)
              // Add profile/settings navigation here
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Settings
          </button>
          
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
} 