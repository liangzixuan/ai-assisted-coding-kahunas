"use client"

import { useSession } from "next-auth/react"
import type { UserRole } from "@/types/auth"

export function useAuth() {
  const { data: session, status } = useSession()
  
  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: !!session,
    role: session?.user?.role,
  }
}

export function useIsCoach() {
  const { role } = useAuth()
  return role === "COACH"
}

export function useIsClient() {
  const { role } = useAuth()
  return role === "CLIENT"
}

export function useRequireAuth() {
  const auth = useAuth()
  
  if (!auth.isLoading && !auth.isAuthenticated) {
    throw new Error("Authentication required")
  }
  
  return auth
}

export function useRequireRole(requiredRole: UserRole) {
  const auth = useAuth()
  
  if (!auth.isLoading && auth.role !== requiredRole) {
    throw new Error(`Role ${requiredRole} required`)
  }
  
  return auth
} 