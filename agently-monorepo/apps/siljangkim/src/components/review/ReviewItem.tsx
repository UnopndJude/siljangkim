import React from 'react'

interface ReviewItemProps {
  author: string
  rating: number
  date: string
  content: string
  helpful?: number
}

export function ReviewItem({
  author,
  rating,
  date,
  content,
  helpful = 0,
}: ReviewItemProps) {
  return (
    <div className="border-b border-gray-200 pb-6 last:border-0">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-300" />
          <div>
            <p className="font-medium text-gray-900">{author}</p>
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? 'fill-current' : 'fill-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">{date}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mb-3 text-gray-700">{content}</p>
      <div className="flex items-center space-x-4 text-sm">
        <button className="text-gray-500 hover:text-primary-600">
          도움이 됐어요 ({helpful})
        </button>
        <button className="text-gray-500 hover:text-primary-600">신고</button>
      </div>
    </div>
  )
}