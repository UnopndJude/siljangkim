'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { registerUser } from '@/app/actions/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? '처리 중...' : text}
    </button>
  )
}

export default function RegisterForm() {
  const router = useRouter()
  const [state, formAction] = useFormState(registerUser, undefined)
  const [step, setStep] = useState(1)
  const [verificationType, setVerificationType] = useState<'medical' | 'business' | null>(null)

  // 회원가입 성공 시 로그인 페이지로 이동
  if (state?.success) {
    router.push('/login?registered=true')
  }

  return (
    <form action={formAction} className="mt-8 space-y-6">
      {step === 1 ? (
        <>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="이메일을 입력하세요"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="비밀번호를 입력하세요 (6자 이상)"
              />
            </div>

            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="비밀번호를 다시 입력하세요"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="실명을 입력하세요"
              />
            </div>

            <div>
              <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">
                병원명
              </label>
              <input
                id="hospitalName"
                name="hospitalName"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="소속 병원명을 입력하세요"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            다음 단계
          </button>
        </>
      ) : (
        <>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                병원 관계자 인증 방법을 선택하세요
              </p>
              <div className="space-y-2">
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="verificationType"
                    value="medical"
                    checked={verificationType === 'medical'}
                    onChange={() => setVerificationType('medical')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    의사면허증으로 인증
                  </span>
                </label>
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="verificationType"
                    value="business"
                    checked={verificationType === 'business'}
                    onChange={() => setVerificationType('business')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    사업자번호로 인증
                  </span>
                </label>
              </div>
            </div>

            {verificationType === 'medical' && (
              <div>
                <label htmlFor="medicalLicenseNumber" className="block text-sm font-medium text-gray-700">
                  의사면허번호
                </label>
                <input
                  id="medicalLicenseNumber"
                  name="medicalLicenseNumber"
                  type="text"
                  required
                  pattern="[0-9]{5,6}"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="의사면허번호를 입력하세요"
                />
              </div>
            )}

            {verificationType === 'business' && (
              <div>
                <label htmlFor="businessNumber" className="block text-sm font-medium text-gray-700">
                  사업자번호
                </label>
                <input
                  id="businessNumber"
                  name="businessNumber"
                  type="text"
                  required
                  pattern="[0-9]{10}"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="사업자번호를 입력하세요 (- 제외)"
                />
              </div>
            )}

            {verificationType && (
              <div>
                <label htmlFor="verificationFile" className="block text-sm font-medium text-gray-700">
                  인증 서류 업로드
                </label>
                <input
                  id="verificationFile"
                  name="verificationFile"
                  type="file"
                  accept="image/*,.pdf"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {verificationType === 'medical' ? '의사면허증' : '사업자등록증'} 사본을 업로드하세요 (이미지 또는 PDF)
                </p>
              </div>
            )}
          </div>

          {state?.error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{state.error}</p>
            </div>
          )}

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              이전
            </button>
            <SubmitButton text="가입 완료" />
          </div>
        </>
      )}

      <div className="text-center">
        <span className="text-sm text-gray-600">
          이미 회원이신가요?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            로그인
          </Link>
        </span>
      </div>
    </form>
  )
}