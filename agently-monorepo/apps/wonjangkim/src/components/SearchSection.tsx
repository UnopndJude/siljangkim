'use client'

import { Search, MapPin, Stethoscope } from 'lucide-react'

export default function SearchSection() {
  const popularSpecialties = [
    { name: '피부과', emoji: '✨' },
    { name: '성형외과', emoji: '💉' },
    { name: '산부인과', emoji: '🤰' },
    { name: '내과', emoji: '🩺' },
    { name: '정신건강의학과', emoji: '🧠' },
    { name: '치과', emoji: '🦷' },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-soft p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-gradient">어떤 동료</span>를 찾으세요? 👩‍⚕️
          </h2>

          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="의사명, 진료과목, 병원명으로 검색해보세요"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-primary-100 focus:border-primary-300 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Location Select */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-primary-100 focus:border-primary-300 focus:outline-none transition-colors appearance-none bg-white">
                  <option>지역 선택</option>
                  <option>서울 전체</option>
                  <option>강남구</option>
                  <option>서초구</option>
                  <option>송파구</option>
                  <option>마포구</option>
                  <option>용산구</option>
                  <option>중구</option>
                </select>
              </div>

              {/* Specialty Select */}
              <div className="relative">
                <Stethoscope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-primary-100 focus:border-primary-300 focus:outline-none transition-colors appearance-none bg-white">
                  <option>진료과목 선택</option>
                  <option>피부과</option>
                  <option>성형외과</option>
                  <option>산부인과</option>
                  <option>내과</option>
                  <option>정신건강의학과</option>
                  <option>치과</option>
                  <option>안과</option>
                </select>
              </div>
            </div>

            <button className="w-full py-4 bg-gradient-pink-purple text-white rounded-2xl font-medium shadow-soft hover:shadow-soft-lg transition-all transform hover:scale-[1.02]">
              검색하기 🔍
            </button>
          </div>

          {/* Popular Specialties */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-4">인기 전문 분야</p>
            <div className="flex flex-wrap gap-2">
              {popularSpecialties.map((specialty) => (
                <button
                  key={specialty.name}
                  className="px-4 py-2 bg-primary-50 hover:bg-primary-100 text-primary-600 rounded-full text-sm font-medium transition-colors flex items-center gap-1"
                >
                  <span>{specialty.emoji}</span>
                  <span>{specialty.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}