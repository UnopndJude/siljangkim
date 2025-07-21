'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isLoggedIn = false // TODO: 실제 로그인 상태로 대체

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">김실장넷</span>
            </Link>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link href="/reviews" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600">
                평가 보기
              </Link>
              <Link href="/coordinators" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600">
                상담실장/코디 찾기
              </Link>
              <Link href="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-gray-600">
                소개
              </Link>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/reviews/write" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                  평가 작성
                </Link>
                <Link href="/profile" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  내 프로필
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  로그인
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">
                  회원가입
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">메뉴 열기</span>
              {!isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link href="/reviews" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                평가 보기
              </Link>
              <Link href="/coordinators" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                상담실장/코디 찾기
              </Link>
              <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                소개
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {isLoggedIn ? (
                <>
                  <Link href="/reviews/write" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    평가 작성
                  </Link>
                  <Link href="/profile" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    내 프로필
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    로그인
                  </Link>
                  <Link href="/register" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}