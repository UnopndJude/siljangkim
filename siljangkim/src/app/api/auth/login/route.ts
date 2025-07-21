import { NextRequest, NextResponse } from 'next/server'
import { getContainer } from '@/lib/container'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const container = getContainer()

    const result = await container.loginUserUseCase.execute({
      email: body.email,
      password: body.password
    })

    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: result.user.id.value,
          email: result.user.email.value,
          name: result.user.name,
          hospitalName: result.user.hospitalName,
          role: result.user.role,
          verificationStatus: result.user.verificationStatus,
          isVerified: result.user.isVerified
        },
        token: result.token
      }
    })

    // Set HTTP-only cookie
    response.cookies.set('auth-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return response
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 401 })
  }
}