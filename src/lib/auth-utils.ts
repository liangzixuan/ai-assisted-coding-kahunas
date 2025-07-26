import { auth } from "@/lib/auth"
import type { UserRole } from "@/types/auth"

/**
 * Get the current user session on the server side
 */
export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

/**
 * Check if the current user has a specific role
 */
export async function hasRole(role: UserRole) {
  const user = await getCurrentUser()
  return user?.role === role
}

/**
 * Check if the current user is a coach
 */
export async function isCoach() {
  return hasRole("COACH")
}

/**
 * Check if the current user is a client
 */
export async function isClient() {
  return hasRole("CLIENT")
}

/**
 * Require authentication, throw error if not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

/**
 * Require specific role, throw error if user doesn't have the role
 */
export async function requireRole(role: UserRole) {
  const user = await requireAuth()
  if (user.role !== role) {
    throw new Error(`Role ${role} required`)
  }
  return user
} 