import Link from 'next/link'
import { Instagram, Youtube, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-gradient">김원장넷</span>
              <span className="text-xl">💖</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              의료계 종사자들을 위한 커뮤니티<br />
              신뢰할 수 있는 동료 평가 플랫폼
            </p>
            <div className="flex space-x-3">
              <button className="p-2 bg-primary-50 hover:bg-primary-100 rounded-full transition-colors">
                <Instagram className="w-5 h-5 text-primary-500" />
              </button>
              <button className="p-2 bg-primary-50 hover:bg-primary-100 rounded-full transition-colors">
                <Youtube className="w-5 h-5 text-primary-500" />
              </button>
              <button className="p-2 bg-primary-50 hover:bg-primary-100 rounded-full transition-colors">
                <MessageCircle className="w-5 h-5 text-primary-500" />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-1">
              서비스 <span>🏥</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/search" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  동료 찾기
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  평가 보기
                </Link>
              </li>
              <li>
                <Link href="/write-review" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  평가 작성
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  이벤트
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-1">
              커뮤니티 <span>👩‍⚕️</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/community/free" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  자유게시판
                </Link>
              </li>
              <li>
                <Link href="/community/questions" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  질문과 답변
                </Link>
              </li>
              <li>
                <Link href="/community/tips" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  전문 지식
                </Link>
              </li>
              <li>
                <Link href="/community/experiences" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  업무 경험
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-1">
              고객지원 <span>💌</span>
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  도움말
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 김원장넷. All rights reserved. Made with 💕
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Link href="/terms" className="hover:text-primary-500 transition-colors">
                이용약관
              </Link>
              <span>·</span>
              <Link href="/privacy" className="hover:text-primary-500 transition-colors">
                개인정보처리방침
              </Link>
              <span>·</span>
              <Link href="/business" className="hover:text-primary-500 transition-colors">
                사업자정보
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}