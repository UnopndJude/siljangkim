'use client'

import { Star, ThumbsUp, MessageCircle } from 'lucide-react'

const reviews = [
  {
    id: 1,
    hospitalName: '루미너스 피부과',
    userName: '김*진',
    rating: 5,
    date: '2024-01-15',
    treatment: '여드름 치료',
    content: '여의사 선생님이 정말 꼼꼼하게 봐주셔서 좋았어요! 피부가 많이 좋아졌습니다 ✨',
    likes: 24,
    comments: 5,
    emoji: '😊',
  },
  {
    id: 2,
    hospitalName: '블룸 산부인과',
    userName: '이*영',
    rating: 5,
    date: '2024-01-12',
    treatment: '정기검진',
    content: '대기시간도 짧고 선생님도 친절하세요. 편안한 분위기에서 진료받을 수 있어요 💕',
    likes: 18,
    comments: 3,
    emoji: '🥰',
  },
  {
    id: 3,
    hospitalName: '마음편한 정신건강의학과',
    userName: '박*희',
    rating: 4,
    date: '2024-01-10',
    treatment: '상담치료',
    content: '처음엔 긴장했는데 선생님이 편하게 대해주셔서 마음 편히 상담받았어요',
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
            <span className="text-gradient">실시간 리뷰</span> 💬
          </h2>
          <p className="text-gray-600 text-lg">
            최근에 작성된 솔직한 병원 후기들
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
                  <h4 className="font-bold text-lg text-primary-600">{review.hospitalName}</h4>
                  <p className="text-sm text-gray-500">{review.treatment}</p>
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
            나의 병원 경험을 공유해주세요! 💝
          </h3>
          <p className="text-gray-600 mb-6">
            솔직한 리뷰로 다른 여성들에게 도움을 주세요
          </p>
          <button className="px-8 py-4 bg-white text-primary-500 rounded-full font-medium shadow-soft hover:shadow-soft-lg transition-all transform hover:scale-105 border-2 border-primary-200">
            리뷰 작성하기 ✍️
          </button>
        </div>
      </div>
    </section>
  )
}