'use client'

import { useState } from 'react'
import Rating from '@/components/ui/Rating'
import RadarChart from '@/components/ui/RadarChart'
import { useRouter } from 'next/navigation'

export default function WriteReviewPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    coordinatorName: '',
    hospitalName: '',
    position: '',
    department: '',
    workYear: new Date().getFullYear(),
    workDuration: '',
    title: '',
    content: '',
    isAnonymous: true,
    ratings: {
      overall: 0,
      professionalism: 0,
      communication: 0,
      responsibility: 0,
      cooperation: 0,
      kindness: 0
    }
  })

  const updateRating = (key: keyof typeof formData.ratings, value: number) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [key]: value
      }
    }))
  }

  const calculateOverallRating = () => {
    const { professionalism, communication, responsibility, cooperation, kindness } = formData.ratings
    const sum = professionalism + communication + responsibility + cooperation + kindness
    return sum > 0 ? Math.round(sum / 5) : 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // TODO: API 호출하여 리뷰 저장
    console.log('Submit review:', formData)
    
    // 성공 시 리뷰 목록으로 이동
    router.push('/reviews')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">평가 작성</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 평가 대상 정보 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">평가 대상 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상담실장/코디 이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.coordinatorName}
                onChange={(e) => setFormData({ ...formData, coordinatorName: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                병원명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                직책
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              >
                <option value="">선택하세요</option>
                <option value="상담실장">상담실장</option>
                <option value="코디네이터">코디네이터</option>
                <option value="기타">기타</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                부서
              </label>
              <input
                type="text"
                placeholder="예: 성형외과, 피부과"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* 근무 정보 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">근무 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                근무 연도
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.workYear}
                onChange={(e) => setFormData({ ...formData, workYear: parseInt(e.target.value) })}
              >
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}년</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                근무 기간
              </label>
              <input
                type="text"
                placeholder="예: 6개월, 1년 3개월"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.workDuration}
                onChange={(e) => setFormData({ ...formData, workDuration: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* 평가 항목 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">평가 항목</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  전문성 <span className="text-red-500">*</span>
                </label>
                <Rating 
                  value={formData.ratings.professionalism} 
                  onChange={(value) => updateRating('professionalism', value)}
                  size="md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  소통능력 <span className="text-red-500">*</span>
                </label>
                <Rating 
                  value={formData.ratings.communication} 
                  onChange={(value) => updateRating('communication', value)}
                  size="md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  책임감 <span className="text-red-500">*</span>
                </label>
                <Rating 
                  value={formData.ratings.responsibility} 
                  onChange={(value) => updateRating('responsibility', value)}
                  size="md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  협업능력 <span className="text-red-500">*</span>
                </label>
                <Rating 
                  value={formData.ratings.cooperation} 
                  onChange={(value) => updateRating('cooperation', value)}
                  size="md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  친절도 <span className="text-red-500">*</span>
                </label>
                <Rating 
                  value={formData.ratings.kindness} 
                  onChange={(value) => updateRating('kindness', value)}
                  size="md"
                />
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-sm font-medium text-gray-700 mb-4">평가 요약</h3>
              <RadarChart data={formData.ratings} size={250} />
              <p className="mt-4 text-lg font-semibold">
                종합 평점: {calculateOverallRating()}/5
              </p>
            </div>
          </div>
        </div>

        {/* 상세 평가 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">상세 평가</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                minLength={5}
                placeholder="평가 제목을 입력하세요 (최소 5자)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                minLength={20}
                rows={6}
                placeholder="구체적인 평가 내용을 작성해주세요 (최소 20자)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                익명으로 작성 (추천)
              </label>
            </div>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={
              !formData.coordinatorName ||
              !formData.hospitalName ||
              !formData.title ||
              !formData.content ||
              formData.ratings.professionalism === 0 ||
              formData.ratings.communication === 0 ||
              formData.ratings.responsibility === 0 ||
              formData.ratings.cooperation === 0 ||
              formData.ratings.kindness === 0
            }
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            평가 등록
          </button>
        </div>
      </form>
    </div>
  )
}