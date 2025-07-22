'use client'

import { useEffect, useRef } from 'react'

interface RadarChartProps {
  data: {
    professionalism: number // 전문성
    communication: number   // 소통능력
    responsibility: number  // 책임감
    cooperation: number     // 협업능력
    kindness: number       // 친절도
  }
  size?: number
}

export default function RadarChart({ data, size = 200 }: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const labels = ['전문성', '소통능력', '책임감', '협업능력', '친절도']
  const values = [
    data.professionalism,
    data.communication,
    data.responsibility,
    data.cooperation,
    data.kindness
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    const centerX = size / 2
    const centerY = size / 2
    const radius = (size / 2) * 0.8
    const angleStep = (Math.PI * 2) / 5

    // Draw background circles and axes
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1

    // Draw concentric circles
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath()
      for (let j = 0; j < 5; j++) {
        const angle = j * angleStep - Math.PI / 2
        const x = centerX + Math.cos(angle) * (radius * i / 5)
        const y = centerY + Math.sin(angle) * (radius * i / 5)
        if (j === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.closePath()
      ctx.stroke()
    }

    // Draw axes
    for (let i = 0; i < 5; i++) {
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      const angle = i * angleStep - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    // Draw labels
    ctx.fillStyle = '#374151'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    for (let i = 0; i < 5; i++) {
      const angle = i * angleStep - Math.PI / 2
      const labelRadius = radius + 20
      const x = centerX + Math.cos(angle) * labelRadius
      const y = centerY + Math.sin(angle) * labelRadius
      ctx.fillText(labels[i], x, y)
    }

    // Draw data polygon
    ctx.beginPath()
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)'
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 2

    for (let i = 0; i < 5; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = values[i] / 5
      const x = centerX + Math.cos(angle) * (radius * value)
      const y = centerY + Math.sin(angle) * (radius * value)
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw data points
    ctx.fillStyle = '#3b82f6'
    for (let i = 0; i < 5; i++) {
      const angle = i * angleStep - Math.PI / 2
      const value = values[i] / 5
      const x = centerX + Math.cos(angle) * (radius * value)
      const y = centerY + Math.sin(angle) * (radius * value)
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    }

  }, [data, size, labels, values])

  return (
    <canvas 
      ref={canvasRef} 
      width={size} 
      height={size}
      className="mx-auto"
    />
  )
}