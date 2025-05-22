"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"

export interface ProgressBarProps {
  title: string
  description?: string
  value: number
  max?: number
  showValue?: boolean
  interactive?: boolean
  className?: string
}

/**
 * ProgressBar - Shows task progress, optionally interactive
 *
 * Display component that can optionally send updates to the agent
 */
export function ProgressBar({
  title,
  description,
  value,
  max = 100,
  showValue = true,
  interactive = false,
  className,
}: ProgressBarProps) {
  const { sendAgentResponse } = useAgentActions()
  const [progress, setProgress] = useState(value)

  // Update internal state when prop changes
  useEffect(() => {
    setProgress(value)
  }, [value])

  const percentage = Math.round((progress / max) * 100)

  const handleCancel = () => {
    sendAgentResponse(`User canceled: ${title}`)
  }

  const handleComplete = () => {
    setProgress(max)
    sendAgentResponse(`User marked as complete: ${title}`)
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {showValue && (
            <span className="text-sm font-medium">
              {progress}/{max} ({percentage}%)
            </span>
          )}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={percentage} className="h-2" />

        {interactive && (
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleComplete}>
              Mark Complete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
