"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { UserRole } from "@/types/auth"

export default function RoleSelectionPage() {
  const { data: session, update } = useSession()
  const [selectedRole, setSelectedRole] = useState<UserRole>("CLIENT")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleRoleSelection = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Update user role in the database
      const response = await fetch("/api/auth/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: selectedRole,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update role")
      }

      // Update the session
      await update({ role: selectedRole })

      // Redirect based on selected role
      if (selectedRole === "COACH") {
        router.push("/coach")
      } else {
        router.push("/client")
      }
    } catch (error) {
      setError("Failed to set your role. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) {
    router.push("/auth/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Kahunas</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {session.user.name}!</h1>
          <p className="text-gray-600">Help us customize your experience</p>
        </div>

        {/* Role Selection */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">I am a...</h2>
            <div className="space-y-3">
              <button
                onClick={() => setSelectedRole("COACH")}
                className={`w-full p-6 border-2 rounded-lg text-left transition-colors ${
                  selectedRole === "COACH"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedRole === "COACH" ? "border-blue-600 bg-blue-600" : "border-gray-300"
                  }`}>
                    {selectedRole === "COACH" && <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5"></div>}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Coach</div>
                    <div className="text-sm text-gray-500">
                      I provide coaching services to clients and want to manage my coaching business
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectedRole("CLIENT")}
                className={`w-full p-6 border-2 rounded-lg text-left transition-colors ${
                  selectedRole === "CLIENT"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedRole === "CLIENT" ? "border-blue-600 bg-blue-600" : "border-gray-300"
                  }`}>
                    {selectedRole === "CLIENT" && <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5"></div>}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Client</div>
                    <div className="text-sm text-gray-500">
                      I&apos;m looking for coaching services and want to work with a coach
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <button
            onClick={handleRoleSelection}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Setting up your account..." : "Continue"}
          </button>
        </div>
      </div>
    </div>
  )
} 