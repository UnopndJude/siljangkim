import { NextRequest, NextResponse } from 'next/server'
import { getContainer } from '@/lib/container'
import { RegisterUserDTO } from '@/application/use-cases/auth/RegisterUserUseCase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const container = getContainer()

    const dto: RegisterUserDTO = {
      email: body.email,
      password: body.password,
      name: body.name,
      hospitalName: body.hospitalName,
      verificationType: body.verificationType,
      medicalLicenseNumber: body.medicalLicenseNumber,
      businessNumber: body.businessNumber,
      verificationDocuments: body.verificationDocuments || []
    }

    const user = await container.registerUserUseCase.execute(dto)
    
    return NextResponse.json({
      success: true,
      data: {
        id: user.id.value,
        email: user.email.value,
        name: user.name,
        hospitalName: user.hospitalName,
        verificationStatus: user.verificationStatus,
        isVerified: user.isVerified
      }
    }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 400 })
  }
}