import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAuthPage = nextUrl.pathname.startsWith('/login') || 
                          nextUrl.pathname.startsWith('/register')
      const isProtectedPage = nextUrl.pathname.startsWith('/reviews/write') ||
                             nextUrl.pathname.startsWith('/profile') ||
                             nextUrl.pathname.startsWith('/admin')

      if (isProtectedPage) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isOnAuthPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/profile', nextUrl))
        }
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.verificationStatus = user.verificationStatus
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.verificationStatus = token.verificationStatus as string
      }
      return session
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig