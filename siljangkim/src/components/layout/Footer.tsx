import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">김실장넷</h3>
            <p className="text-sm text-gray-600">
              병원 관계자들을 위한<br />
              상담실장 & 코디네이터<br />
              평판 공유 플랫폼
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">서비스</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/reviews" className="text-sm text-gray-600 hover:text-gray-900">
                  평가 보기
                </Link>
              </li>
              <li>
                <Link href="/coordinators" className="text-sm text-gray-600 hover:text-gray-900">
                  상담실장/코디 찾기
                </Link>
              </li>
              <li>
                <Link href="/reviews/write" className="text-sm text-gray-600 hover:text-gray-900">
                  평가 작성
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">정보</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-sm text-gray-600 hover:text-gray-900">
                  이용 가이드
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">
                  자주 묻는 질문
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">약관 및 정책</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm text-gray-600 hover:text-gray-900">
                  면책조항
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © 2024 김실장넷. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}