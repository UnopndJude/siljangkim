import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface CoordinatorCardProps {
  name: string
  location: string
  rating: number
  reviewCount: number
  description: string
  imageUrl?: string
}

export function CoordinatorCard({
  name,
  location,
  rating,
  reviewCount,
  description,
  imageUrl,
}: CoordinatorCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-300">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full rounded-full object-cover"
              />
            )}
          </div>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(rating) ? 'fill-current' : 'fill-gray-300'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {rating.toFixed(1)} ({reviewCount}개 리뷰)
          </span>
        </div>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{description}</p>
        <Button className="w-full">자세히 보기</Button>
      </CardContent>
    </Card>
  )
}