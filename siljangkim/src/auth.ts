import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import { getContainer } from '@/lib/container'
import { User } from '@/domain/entities/User'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const container = getContainer()
          
          try {
            const result = await container.loginUserUseCase.execute({ email, password })
            const user = result.user
            
            return {
              id: user.id.value,
              email: user.email.value,
              name: user.name,
              role: user.role,
              verificationStatus: user.verificationStatus,
            }
          } catch (error) {
            return null
          }
        }

        return null
      },
    }),
  ],
})