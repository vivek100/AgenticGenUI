"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react"

export interface Toast {
  id: string
  message: string
  type: "info" | "success" | "warning" | "error"
  duration?: number
}

export interface ToastStackProps {
  title: string
  description?: string
  toasts?: Toast[]
  className?: string
}

/**
 * ToastStack - Multiple dismissible toasts
 *
 * Component for displaying and managing toast notifications
 */
export function ToastStack({ title, description, toasts = [], className }: ToastStackProps) {
  const { callTool } = useAgentActions()
  const [activeToasts, setActiveToasts] = useState<Toast[]>(toasts)

  // Auto-dismiss toasts based on duration
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    activeToasts.forEach((toast) => {
      if (toast.duration) {
        const timer = setTimeout(() => {
          handleDismissToast(toast.id)
        }, toast.duration)

        timers.push(timer)
      }
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [activeToasts])

  const handleDismissToast = (id: string) => {
    setActiveToasts((prev) => prev.filter((toast) => toast.id !== id))
    callTool("dismissToast", { id })
  }

  const getToastIcon = (type: Toast["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getToastStyles = (type: Toast["type"]) => {
    switch (type) {
      case "info":
        return "border-blue-200 bg-blue-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "warning":
        return "border-amber-200 bg-amber-50"
      case "error":
        return "border-red-200 bg-red-50"
    }
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {!activeToasts || activeToasts.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">No active notifications</p>
          </div>
        ) : (
          <div className="space-y-2">
            {activeToasts.map((toast) => (
              <div
                key={toast.id}
                className={cn("flex items-start gap-3 rounded-md border p-4 shadow-sm", getToastStyles(toast.type))}
              >
                {getToastIcon(toast.type)}
                <div className="flex-1">
                  <p className="text-sm">{toast.message}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleDismissToast(toast.id)}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Dismiss</span>
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setActiveToasts((prev) => [
                ...prev,
                {
                  id: `toast-${Date.now()}`,
                  message: "This is an info notification",
                  type: "info",
                  duration: 5000,
                },
              ])
            }
          >
            <Info className="mr-2 h-4 w-4" />
            Add Info
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setActiveToasts((prev) => [
                ...prev,
                {
                  id: `toast-${Date.now()}`,
                  message: "Operation completed successfully",
                  type: "success",
                  duration: 5000,
                },
              ])
            }
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Add Success
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setActiveToasts((prev) => [
                ...prev,
                {
                  id: `toast-${Date.now()}`,
                  message: "Warning: This action cannot be undone",
                  type: "warning",
                  duration: 5000,
                },
              ])
            }
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            Add Warning
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setActiveToasts((prev) => [
                ...prev,
                {
                  id: `toast-${Date.now()}`,
                  message: "Error: Failed to complete the operation",
                  type: "error",
                  duration: 5000,
                },
              ])
            }
          >
            <XCircle className="mr-2 h-4 w-4" />
            Add Error
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
