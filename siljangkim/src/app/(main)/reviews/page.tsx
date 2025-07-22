'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Rating from '@/components/ui/Rating'

// 임시 데이터
const mockReviews = [
  {
    id: '1',
    coordinatorName: '김실장',
    hospitalName: '서울대병원',
    title: '전문적이고 책임감 있는 실장님',
    content: '업무 처리가 매우 빠르고 정확합니다. 환자 응대도 친절하고 전문적입니다.',
    author: '익명',
    createdAt: '2024-01-15',
    professionalismRating: 5,
    communicationRating: 4,
    responsibilityRating: 5,
    cooperationRating: 4,
    kindnessRating: 5,
  },
  {
    id: '2',
    coordinatorName: '이코디',
    hospitalName: '삼성서울병원',
    title: '업무는 잘하시나 소통이 부족',
    content: '업무 능력은 좋으나 의료진과의 소통에서 가끔 문제가 있습니다.',
    author: '익명',
    createdAt: '2024-01-10',
    professionalismRating: 4,
    communicationRating: 3,
    responsibilityRating: 4,
    cooperationRating: 3,
    kindnessRating: 3,
  },
]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterHospital, setFilterHospital] = useState('')
  const [sortBy, setSortBy] = useState('latest')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">평가 보기</h1>
        
        {/* 검색 및 필터 */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                검색
              </label>
              <input
                id="search"
                type="text"
                placeholder="실장/코디 이름 검색"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">
                병원
              </label>
              <select
                id="hospital"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={filterHospital}
                onChange={(e) => setFilterHospital(e.target.value)}
              >
                <option value="">전체 병원</option>
                <option value="서울대병원">서울대병원</option>
                <option value="삼성서울병원">삼성서울병원</option>
                <option value="서울아산병원">서울아산병원</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                정렬
              </label>
              <select
                id="sort"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">최신순</option>
                <option value="rating">평점순</option>
                <option value="popular">인기순</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 평가 목록 */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">
                    {review.coordinatorName} - {review.hospitalName}
                  </CardTitle>
                  <div className="mt-2">
                    <Rating value={Math.round((review.professionalismRating + review.communicationRating + review.responsibilityRating + review.cooperationRating + review.kindnessRating) / 5)} readonly size="md" />
                  </div>
                </div>
                <span className="text-sm text-gray-500">{review.createdAt}</span>
              </div>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
              <p className="text-gray-600 mb-4">{review.content}</p>
              
              {/* 세부 평가 */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t">
                <div>
                  <span className="text-sm text-gray-500">전문성</span>
                  <Rating value={review.professionalismRating} readonly size="sm" />
                </div>
                <div>
                  <span className="text-sm text-gray-500">소통능력</span>
                  <Rating value={review.communicationRating} readonly size="sm" />
                </div>
                <div>
                  <span className="text-sm text-gray-500">책임감</span>
                  <Rating value={review.responsibilityRating} readonly size="sm" />
                </div>
                <div>
                  <span className="text-sm text-gray-500">협업능력</span>
                  <Rating value={review.cooperationRating} readonly size="sm" />
                </div>
                <div>
                  <span className="text-sm text-gray-500">친절도</span>
                  <Rating value={review.kindnessRating} readonly size="sm" />
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                작성자: {review.author}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 평가 없음 메시지 */}
      {mockReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">아직 작성된 평가가 없습니다.</p>
        </div>
      )}
    </div>
  )
}