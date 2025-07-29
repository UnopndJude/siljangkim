import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '김실장넷 - 코디네이터 평가 플랫폼',
  description: '믿을 수 있는 코디네이터 평가와 리뷰를 확인하세요',
  keywords: '코디네이터, 평가, 리뷰, 김실장넷',
  openGraph: {
    title: '김실장넷 - 코디네이터 평가 플랫폼',
    description: '믿을 수 있는 코디네이터 평가와 리뷰를 확인하세요',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-50 antialiased">
        <div className="flex min-h-screen flex-col">
          {/* Header */}
          <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center px-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-primary-700">김실장넷</h1>
                <span className="text-sm text-gray-600">코디네이터 평가 플랫폼</span>
              </div>
              <nav className="ml-auto flex items-center space-x-6">
                <a href="#" className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600">
                  코디네이터 찾기
                </a>
                <a href="#" className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600">
                  평가하기
                </a>
                <a href="#" className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600">
                  리뷰 보기
                </a>
                <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700">
                  로그인
                </button>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="border-t bg-white">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">김실장넷</h3>
                  <p className="text-sm text-gray-600">
                    믿을 수 있는 코디네이터 평가 플랫폼
                  </p>
                </div>
                <div>
                  <h4 className="mb-4 text-sm font-semibold text-gray-900">서비스</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><a href="#" className="hover:text-primary-600">코디네이터 검색</a></li>
                    <li><a href="#" className="hover:text-primary-600">평가 작성</a></li>
                    <li><a href="#" className="hover:text-primary-600">인기 코디네이터</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-sm font-semibold text-gray-900">고객지원</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><a href="#" className="hover:text-primary-600">문의하기</a></li>
                    <li><a href="#" className="hover:text-primary-600">FAQ</a></li>
                    <li><a href="#" className="hover:text-primary-600">이용약관</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-sm font-semibold text-gray-900">회사정보</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><a href="#" className="hover:text-primary-600">회사소개</a></li>
                    <li><a href="#" className="hover:text-primary-600">개인정보처리방침</a></li>
                    <li><a href="#" className="hover:text-primary-600">운영정책</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 border-t pt-8 text-center text-sm text-gray-600">
                © 2024 김실장넷. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}