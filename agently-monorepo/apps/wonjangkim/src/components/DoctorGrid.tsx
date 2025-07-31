import Image from 'next/image'
import { Star, MapPin, Clock, Heart } from 'lucide-react'

const medicalProfessionals = [
  {
    id: 1,
    name: '김원장',
    specialty: '피부과',
    rating: 4.8,
    reviewCount: 342,
    location: '강남구 신사동',
    tags: ['전문성', '소통능력', '친절도'],
    emoji: '✨',
    image: '/images/doctor1.jpg',
    isLiked: true,
  },
  {
    id: 2,
    name: '박원장',
    specialty: '산부인과',
    rating: 4.9,
    reviewCount: 256,
    location: '서초구 서초동',
    tags: ['책임감', '협업능력', '전문성'],
    emoji: '🌸',
    image: '/images/doctor2.jpg',
    isLiked: false,
  },
  {
    id: 3,
    name: '이원장',
    specialty: '정신건강의학과',
    rating: 4.7,
    reviewCount: 189,
    location: '마포구 상수동',
    tags: ['소통능력', '전문성', '친절도'],
    emoji: '🧠',
    image: '/images/doctor3.jpg',
    isLiked: false,
  },
  {
    id: 4,
    name: '최원장',
    specialty: '치과',
    rating: 4.6,
    reviewCount: 423,
    location: '송파구 잠실동',
    tags: ['전문성', '책임감', '협업능력'],
    emoji: '🦷',
    image: '/images/doctor4.jpg',
    isLiked: true,
  },
]

export default function DoctorGrid() {
  return (
    <section className="py-16 px-4 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gradient">인기 의료진</span> 추천 💖
          </h2>
          <p className="text-gray-600 text-lg">
            의료계 종사자들이 가장 많이 평가한 동료들을 만나보세요
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicalProfessionals.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all transform hover:scale-[1.02] overflow-hidden group"
            >
              {/* Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                <span className="text-6xl animate-pulse-soft">{doctor.emoji}</span>
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors">
                  <Heart
                    className={`w-5 h-5 ${
                      doctor.isLiked ? 'fill-primary-500 text-primary-500' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-2">
                  <h3 className="font-bold text-lg text-gray-800">{doctor.name}</h3>
                  <p className="text-sm text-primary-500">{doctor.specialty}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm ml-1">{doctor.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">({doctor.reviewCount}개 평가)</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-gray-600 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.location}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {doctor.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-pink-purple text-white rounded-full font-medium shadow-soft hover:shadow-soft-lg transition-all transform hover:scale-105">
            더 많은 의료진 보기 →
          </button>
        </div>
      </div>
    </section>
  )
}