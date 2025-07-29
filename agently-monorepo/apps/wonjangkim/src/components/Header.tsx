'use client'

import Link from 'next/link'
import { Search, Heart, User, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gradient">김원장넷</span>
            <span className="text-xl">💖</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/search" className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors">
              <span>병원 찾기</span>
              <span>🏥</span>
            </Link>
            <Link href="/reviews" className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors">
              <span>리뷰 보기</span>
              <span>💬</span>
            </Link>
            <Link href="/events" className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors">
              <span>이벤트</span>
              <span>🎁</span>
            </Link>
            <Link href="/community" className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition-colors">
              <span>커뮤니티</span>
              <span>👭</span>
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-primary-50 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-primary-50 rounded-full transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <Link href="/auth/login" className="px-4 py-2 bg-gradient-pink-purple text-white rounded-full font-medium shadow-soft hover:shadow-soft-lg transition-all transform hover:scale-105">
              로그인 ✨
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="space-y-2">
              <Link href="/search" className="flex items-center justify-between p-2 hover:bg-primary-50 rounded-lg transition-colors">
                <span className="text-gray-700">병원 찾기</span>
                <span>🏥</span>
              </Link>
              <Link href="/reviews" className="flex items-center justify-between p-2 hover:bg-primary-50 rounded-lg transition-colors">
                <span className="text-gray-700">리뷰 보기</span>
                <span>💬</span>
              </Link>
              <Link href="/events" className="flex items-center justify-between p-2 hover:bg-primary-50 rounded-lg transition-colors">
                <span className="text-gray-700">이벤트</span>
                <span>🎁</span>
              </Link>
              <Link href="/community" className="flex items-center justify-between p-2 hover:bg-primary-50 rounded-lg transition-colors">
                <span className="text-gray-700">커뮤니티</span>
                <span>👭</span>
              </Link>
              <div className="pt-2 mt-2 border-t border-gray-100">
                <Link href="/auth/login" className="block text-center px-4 py-2 bg-gradient-pink-purple text-white rounded-full font-medium shadow-soft">
                  로그인 ✨
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}