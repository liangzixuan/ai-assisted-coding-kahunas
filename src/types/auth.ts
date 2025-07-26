export type UserRole = "COACH" | "CLIENT"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: UserRole
    }
  }

  interface User {
    role: UserRole
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: UserRole
  }
}

export interface SignUpData {
  name: string
  email: string
  password: string
  role: UserRole
} 