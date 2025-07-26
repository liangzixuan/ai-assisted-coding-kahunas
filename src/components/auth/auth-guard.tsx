"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { UserRole } from "@/types/auth"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: UserRole
  fallbackUrl?: string
}

export default function AuthGuard({ 
  children, 
  requiredRole, 
  fallbackUrl = "/auth/login" 
}: AuthGuardProps) {
  const { isAuthenticated, isLoading, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(fallbackUrl)
        return
      }

      if (requiredRole && role !== requiredRole) {
        // Redirect to appropriate dashboard based on user's role
        if (role === "COACH") {
          router.push("/coach")
        } else {
          router.push("/client")
        }
        return
      }
    }
  }, [isAuthenticated, isLoading, role, requiredRole, router, fallbackUrl])

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show nothing while redirecting
  if (!isAuthenticated || (requiredRole && role !== requiredRole)) {
    return null
  }

  return <>{children}</>
} 