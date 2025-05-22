"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface ChartProps {
  title: string
  description?: string
  data: Array<{ x: string | number; y: number }>
  type?: "line" | "bar"
  className?: string
}

/**
 * Chart - Renders JSON data as a chart preview
 *
 * Display-only component for visualizing data
 */
export function Chart({ title, description, data, type = "line", className }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const padding = 40

    // Find min/max values
    const xValues = data.map((d) => (typeof d.x === "string" ? data.indexOf(d) : Number(d.x)))
    const yValues = data.map((d) => d.y)
    const minX = Math.min(...xValues)
    const maxX = Math.max(...xValues)
    const minY = Math.min(0, ...yValues) // Always include 0 in the range
    const maxY = Math.max(...yValues)

    // Scale functions
    const scaleX = (x: number) => padding + ((x - minX) * (width - padding * 2)) / (maxX - minX || 1)
    const scaleY = (y: number) => height - padding - ((y - minY) * (height - padding * 2)) / (maxY - minY || 1)

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#ddd"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw data
    ctx.beginPath()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2

    if (type === "line") {
      data.forEach((point, i) => {
        const x = scaleX(typeof point.x === "string" ? i : Number(point.x))
        const y = scaleY(point.y)

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()
    } else if (type === "bar") {
      const barWidth = ((width - padding * 2) / data.length) * 0.8

      data.forEach((point, i) => {
        const x = scaleX(typeof point.x === "string" ? i : Number(point.x)) - barWidth / 2
        const y = scaleY(point.y)
        const barHeight = height - padding - y

        ctx.fillStyle = "#3b82f6"
        ctx.fillRect(x, y, barWidth, barHeight)
      })
    }

    // Draw labels
    ctx.fillStyle = "#888"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"

    // X-axis labels (show 5 labels max)
    const step = Math.ceil(data.length / 5)
    data.forEach((point, i) => {
      if (i % step === 0 || i === data.length - 1) {
        const x = scaleX(typeof point.x === "string" ? i : Number(point.x))
        ctx.fillText(String(point.x), x, height - padding + 15)
      }
    })

    // Y-axis labels
    const yStep = (maxY - minY) / 5
    for (let i = 0; i <= 5; i++) {
      const y = minY + i * yStep
      const scaledY = scaleY(y)
      ctx.textAlign = "right"
      ctx.fillText(y.toFixed(1), padding - 5, scaledY + 3)
    }
  }, [data, type])

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="w-full aspect-[2/1]">
          <canvas ref={canvasRef} width={500} height={250} className="w-full h-full" />
        </div>
      </CardContent>
    </Card>
  )
}
