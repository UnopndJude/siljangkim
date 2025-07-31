'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const [currentEmoji, setCurrentEmoji] = useState(0)
  const emojis = ['💖', '🏥', '👩‍⚕️', '✨', '🌸']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % emojis.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-white to-secondary-100">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000" />
        <div className="absolute -bottom-32 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6 animate-bounce-slow">
          <span className="text-6xl">{emojis[currentEmoji]}</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">의료계 종사자들을 위한</span>
          <br />
          <span className="text-gray-800">신뢰할 수 있는 커뮤니티</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          의사, 원장, 의료진들의 솔직한 경험담과 함께<br />
          더 나은 의료 환경을 만들어가요 💕
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-gradient-pink-purple text-white rounded-full font-medium shadow-soft hover:shadow-soft-lg transition-all transform hover:scale-105 text-lg">
            커뮤니티 둘러보기 🔍
          </button>
          <button className="px-8 py-4 bg-white text-primary-500 rounded-full font-medium shadow-soft hover:shadow-soft-lg transition-all transform hover:scale-105 text-lg border-2 border-primary-200">
            평가 작성하기 ✍️
          </button>
        </div>

        <div className="mt-16 animate-bounce">
          <ChevronDown className="w-8 h-8 text-primary-400 mx-auto" />
        </div>
      </div>
    </section>
  )
}