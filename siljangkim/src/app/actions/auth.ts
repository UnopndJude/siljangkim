'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { getContainer } from '@/lib/container'
import { RegisterUserDTO } from '@/application/use-cases/auth/RegisterUserUseCase'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return '이메일 또는 비밀번호가 올바르지 않습니다.'
        default:
          return '로그인 중 오류가 발생했습니다.'
      }
    }
    throw error
  }
}

export async function registerUser(
  prevState: { error?: string; success?: boolean } | undefined,
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  try {
    const container = getContainer()
    
    const dto: RegisterUserDTO = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
      hospitalName: formData.get('hospitalName') as string,
      verificationType: formData.get('verificationType') as 'medical' | 'business',
      medicalLicenseNumber: formData.get('medicalLicenseNumber') as string || undefined,
      businessNumber: formData.get('businessNumber') as string || undefined,
      verificationDocuments: [], // TODO: Handle file uploads
    }

    await container.registerUserUseCase.execute(dto)
    
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}