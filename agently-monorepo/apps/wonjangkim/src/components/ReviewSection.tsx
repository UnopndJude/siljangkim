'use client'

import { Star, ThumbsUp, MessageCircle } from 'lucide-react'

const reviews = [
  {
    id: 1,
    doctorName: '김원장',
    userName: '김*진',
    rating: 5,
    date: '2024-01-15',
    specialty: '피부과',
    content: '전문성이 뛰어나고 환자와의 소통도 원활해요. 함께 일하기 좋은 동료입니다 ✨',
    likes: 24,
    comments: 5,
    emoji: '😊',
  },
  {
    id: 2,
    doctorName: '이원장',
    userName: '최*수',
    rating: 5,
    date: '2024-01-12',
    specialty: '산부인과',
    content: '책임감이 강하고 팀워크가 훌륭합니다. 대학병원에서 하나의 모범 사례예요 💕',
    likes: 18,
    comments: 3,
    emoji: '🥰',
  },
  {
    id: 3,
    doctorName: '정원장',
    userName: '김*진',
    rating: 4,
    date: '2024-01-10',
    specialty: '정신건강의학과',
    content: '전문 지식이 풍부하고 동료들과의 협업도 원활합니다. 의료진으로서 신뢰할 수 있어요',
    likes: 32,
    comments: 8,
    emoji: '🤗',
  },
]

export default function ReviewSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gradient">실시간 평가</span> 💬
          </h2>
          <p className="text-gray-600 text-lg">
            의료계 동료들에 대한 솔직한 평가들
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-soft hover:shadow-soft-lg transition-all p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-lg text-primary-600">{review.doctorName}</h4>
                  <p className="text-sm text-gray-500">{review.specialty}</p>
                </div>
                <span className="text-2xl">{review.emoji}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">{review.userName}</span>
                <span className="text-sm text-gray-400">·</span>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-4 line-clamp-3">{review.content}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-500 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{review.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-500 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>{review.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            동료 평가를 공유해주세요! 💝
          </h3>
          <p className="text-gray-600 mb-6">
            솔직한 평가로 다른 의료진들에게 도움을 주세요
          </p>
          <button className="px-8 py-4 bg-white text-primary-500 rounded-full font-medium shadow-soft hover:shadow-soft-lg transition-all transform hover:scale-105 border-2 border-primary-200">
            평가 작성하기 ✍️
          </button>
        </div>
      </div>
    </section>
  )
}