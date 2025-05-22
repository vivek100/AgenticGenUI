"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { Star } from "lucide-react"

export interface RatingSelectorProps {
  title: string
  description?: string
  label?: string
  max?: number
  value?: number
  submitLabel?: string
  className?: string
}

/**
 * RatingSelector - Star rating input
 *
 * Actionable component that triggers a rating submission
 */
export function RatingSelector({
  title,
  description,
  label = "Rate your experience",
  max = 5,
  value = 0,
  submitLabel = "Submit",
  className,
}: RatingSelectorProps) {
  const { callTool } = useAgentActions()
  const [rating, setRating] = useState(value)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    callTool("submitRating", { rating })
    setSubmitted(true)
  }

  const ratingLabels = {
    0: "Not rated",
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Very Good",
    5: "Excellent",
  }

  const getRatingLabel = (rating: number) => {
    if (rating === 0) return ratingLabels[0]
    if (rating > max) return ratingLabels[5]
    return ratingLabels[rating as keyof typeof ratingLabels] || `${rating} stars`
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="font-medium">{label}</div>
          <div className="flex items-center gap-1">
            {Array.from({ length: max }).map((_, i) => (
              <button
                key={i}
                type="button"
                className="focus:outline-none"
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHoveredRating(i + 1)}
                onMouseLeave={() => setHoveredRating(0)}
                disabled={submitted}
              >
                <Star
                  className={cn(
                    "h-8 w-8 transition-all",
                    (hoveredRating ? i < hoveredRating : i < rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground",
                  )}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {hoveredRating ? getRatingLabel(hoveredRating) : getRatingLabel(rating)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSubmit} disabled={rating === 0 || submitted}>
          {submitted ? "Thank you!" : submitLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
