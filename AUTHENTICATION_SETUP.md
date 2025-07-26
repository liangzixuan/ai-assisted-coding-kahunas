# Kahunas Authentication System

This document explains the secure user authentication system implemented for the Kahunas coaching platform.

## Features

- **Email/Password Authentication**: Secure credential-based login with bcrypt password hashing
- **OAuth Integration**: Google OAuth support (LinkedIn can be added with minimal configuration)
- **Role-Based Access Control**: Separate COACH and CLIENT roles with route protection
- **Session Management**: JWT-based sessions with NextAuth.js v5
- **Database Integration**: Prisma with SQLite for user data persistence
- **Route Protection**: Middleware-based authentication and role checking
- **Modern UI**: Beautiful, responsive authentication pages

## Setup Instructions

### 1. Environment Variables

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js Configuration
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 2. Google OAuth Setup (Optional)

To enable Google OAuth:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env` file

### 3. Database Setup

The database is already configured and migrated. If you need to reset:

```bash
npx prisma migrate reset
npx prisma generate
```

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the landing page with authentication links.

## Usage

### Authentication Flow

1. **Sign Up**: New users can register at `/auth/signup`
   - Choose role (Coach or Client)
   - Provide name, email, and password
   - Account is created and user is automatically signed in

2. **Sign In**: Existing users can login at `/auth/login`
   - Email/password or Google OAuth
   - Automatic redirection based on user role

3. **Role Selection**: OAuth users are redirected to `/auth/role-selection` to choose their role

### Protected Routes

- `/coach/*` - Only accessible to users with COACH role
- `/client/*` - Only accessible to users with CLIENT role
- Authentication pages redirect authenticated users to their dashboard

### Components and Hooks

#### Authentication Hooks

```typescript
import { useAuth, useIsCoach, useIsClient } from "@/hooks/use-auth"

// Basic authentication
const { user, isAuthenticated, isLoading, role } = useAuth()

// Role checking
const isCoach = useIsCoach()
const isClient = useIsClient()
```

#### Server-Side Authentication

```typescript
import { getCurrentUser, requireAuth, requireRole } from "@/lib/auth-utils"

// Get current user (returns null if not authenticated)
const user = await getCurrentUser()

// Require authentication (throws error if not authenticated)
const user = await requireAuth()

// Require specific role (throws error if wrong role)
const coach = await requireRole("COACH")
```

#### AuthGuard Component

```typescript
import AuthGuard from "@/components/auth/auth-guard"

export default function CoachPage() {
  return (
    <AuthGuard requiredRole="COACH">
      <div>Coach-only content</div>
    </AuthGuard>
  )
}
```

#### User Menu Component

```typescript
import UserMenu from "@/components/auth/user-menu"

// Add to your layout or header
<UserMenu />
```

### Database Schema

The authentication system uses the following models:

- **User**: Core user information with role
- **Account**: OAuth account linking
- **Session**: User sessions
- **VerificationToken**: Email verification
- **ClientRelationship**: Coach-client relationships

### API Routes

- `POST /api/auth/signup` - User registration
- `POST /api/auth/update-role` - Update user role (for OAuth users)
- `/api/auth/[...nextauth]` - NextAuth.js authentication endpoints

## Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Tokens**: Secure session management
- **CSRF Protection**: Built-in with NextAuth.js
- **Route Protection**: Middleware-based access control
- **Role Verification**: Server and client-side role checking

## Development Notes

### Adding New OAuth Providers

To add LinkedIn or other providers:

1. Install the provider package if needed
2. Add provider configuration to `src/lib/auth.ts`
3. Add environment variables
4. Update the UI components

### Customizing Authentication Pages

The authentication pages are located in:
- `src/app/auth/login/page.tsx`
- `src/app/auth/signup/page.tsx`
- `src/app/auth/role-selection/page.tsx`

### Database Migrations

When modifying the user schema:

```bash
npx prisma migrate dev --name your-migration-name
npx prisma generate
```

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure `DATABASE_URL` is correctly set
2. **OAuth Errors**: Verify OAuth credentials and redirect URIs
3. **Session Issues**: Check `NEXTAUTH_SECRET` is set and consistent
4. **Type Errors**: Run `npx prisma generate` after schema changes

### Testing Authentication

1. Visit `/auth/signup` to create a test account
2. Try both email/password and OAuth flows
3. Test role-based access to `/coach` and `/client` routes
4. Verify logout functionality

## Production Deployment

For production deployment:

1. Use a production database (PostgreSQL recommended)
2. Set strong `NEXTAUTH_SECRET`
3. Configure OAuth redirect URIs for production domain
4. Enable email verification if needed
5. Set up proper error monitoring

## Next Steps

The authentication system is ready for:
- Email verification implementation
- Password reset functionality
- Two-factor authentication
- Social login expansion
- Admin role and permissions
- Audit logging 