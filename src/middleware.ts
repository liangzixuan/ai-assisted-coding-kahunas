import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl, auth: session } = req
  const isLoggedIn = !!session

  // Define protected routes
  const isCoachRoute = nextUrl.pathname.startsWith("/coach")
  const isClientRoute = nextUrl.pathname.startsWith("/client")
  const isAuthRoute = nextUrl.pathname.startsWith("/auth")
  const isProtectedRoute = isCoachRoute || isClientRoute

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    if (session.user.role === "COACH") {
      return NextResponse.redirect(new URL("/coach", nextUrl))
    } else {
      return NextResponse.redirect(new URL("/client", nextUrl))
    }
  }

  // Redirect unauthenticated users to login
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl))
  }

  // Role-based route protection
  if (isLoggedIn && isProtectedRoute) {
    if (isCoachRoute && session.user.role !== "COACH") {
      return NextResponse.redirect(new URL("/client", nextUrl))
    }
    if (isClientRoute && session.user.role !== "CLIENT") {
      return NextResponse.redirect(new URL("/coach", nextUrl))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
} 