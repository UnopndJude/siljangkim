'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Rating from '@/components/ui/Rating'

// 임시 데이터
const mockCoordinators = [
  {
    id: '1',
    name: '김실장',
    hospitalName: '서울대병원',
    position: '상담실장',
    department: '성형외과',
    averageRating: 4.5,
    reviewCount: 15,
    recentReview: '전문적이고 책임감 있는 실장님입니다.',
  },
  {
    id: '2',
    name: '이코디',
    hospitalName: '삼성서울병원',
    position: '코디네이터',
    department: '피부과',
    averageRating: 3.5,
    reviewCount: 8,
    recentReview: '업무는 잘하시나 소통이 부족합니다.',
  },
  {
    id: '3',
    name: '박실장',
    hospitalName: '서울아산병원',
    position: '상담실장',
    department: '정형외과',
    averageRating: 4.8,
    reviewCount: 22,
    recentReview: '매우 친절하고 경험이 풍부하십니다.',
  },
]

export default function CoordinatorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterHospital, setFilterHospital] = useState('')
  const [filterPosition, setFilterPosition] = useState('')

  const filteredCoordinators = mockCoordinators.filter((coordinator) => {
    const matchesSearch = coordinator.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesHospital = !filterHospital || coordinator.hospitalName === filterHospital
    const matchesPosition = !filterPosition || coordinator.position === filterPosition
    return matchesSearch && matchesHospital && matchesPosition
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">상담실장/코디네이터 찾기</h1>
        
        {/* 검색 및 필터 */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                이름 검색
              </label>
              <input
                id="search"
                type="text"
                placeholder="이름으로 검색"
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
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                직책
              </label>
              <select
                id="position"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={filterPosition}
                onChange={(e) => setFilterPosition(e.target.value)}
              >
                <option value="">전체 직책</option>
                <option value="상담실장">상담실장</option>
                <option value="코디네이터">코디네이터</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 코디네이터 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoordinators.map((coordinator) => (
          <Card key={coordinator.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">
                {coordinator.name}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {coordinator.position} · {coordinator.hospitalName}
              </p>
              <p className="text-sm text-gray-500">
                {coordinator.department}
              </p>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">평균 평점</span>
                  <span className="text-sm text-gray-500">({coordinator.reviewCount}개 평가)</span>
                </div>
                <Rating value={coordinator.averageRating} readonly size="md" />
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 italic">
                  "{coordinator.recentReview}"
                </p>
              </div>
              
              <Link
                href={`/coordinators/${coordinator.id}`}
                className="block w-full text-center py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                상세 보기
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 검색 결과 없음 */}
      {filteredCoordinators.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}