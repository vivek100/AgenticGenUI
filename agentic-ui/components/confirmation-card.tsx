"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"

export interface ConfirmationCardProps {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  importance?: "low" | "medium" | "high" | "critical"
  className?: string
}

/**
 * ConfirmationCard - Yes/No choice with inline agent response
 *
 * Actionable component that sends responses back to the agent
 */
export function ConfirmationCard({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  importance = "medium",
  className,
}: ConfirmationCardProps) {
  const { sendAgentResponse } = useAgentActions()

  const handleConfirm = () => {
    sendAgentResponse(`User confirmed: ${title}`)
  }

  const handleCancel = () => {
    sendAgentResponse(`User declined: ${title}`)
  }

  const importanceStyles = {
    low: "border-blue-200",
    medium: "border-blue-300",
    high: "border-amber-300",
    critical: "border-red-300",
  }

  return (
    <Card className={cn("border-l-4", importanceStyles[importance], className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {importance !== "low" && (
            <span
              className={cn("inline-block px-2 py-0.5 text-xs font-medium rounded-full mr-2", {
                "bg-blue-100 text-blue-800": importance === "medium",
                "bg-amber-100 text-amber-800": importance === "high",
                "bg-red-100 text-red-800": importance === "critical",
              })}
            >
              {importance.charAt(0).toUpperCase() + importance.slice(1)} importance
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{message}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleCancel}>
          {cancelLabel}
        </Button>
        <Button onClick={handleConfirm} variant={importance === "critical" ? "destructive" : "default"}>
          {confirmLabel}
        </Button>
      </CardFooter>
    </Card>
  )
}
