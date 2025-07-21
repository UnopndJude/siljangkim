import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      verificationStatus: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: string
    verificationStatus: string
  }
}