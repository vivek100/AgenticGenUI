import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InfoBannerProps {
  title: string
  message: string
  type?: "info" | "success" | "warning" | "error"
  className?: string
}

/**
 * InfoBanner - Displays a status message or notification
 *
 * Display-only component for showing status information
 */
export function InfoBanner({ title, message, type = "info", className }: InfoBannerProps) {
  const typeStyles = {
    info: {
      borderColor: "border-blue-200",
      bgColor: "bg-blue-50",
      icon: <Info className="h-5 w-5 text-blue-500" />,
    },
    success: {
      borderColor: "border-green-200",
      bgColor: "bg-green-50",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    warning: {
      borderColor: "border-amber-200",
      bgColor: "bg-amber-50",
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
    },
    error: {
      borderColor: "border-red-200",
      bgColor: "bg-red-50",
      icon: <XCircle className="h-5 w-5 text-red-500" />,
    },
  }

  const { borderColor, bgColor, icon } = typeStyles[type]

  return (
    <Card className={cn("border-l-4", borderColor, bgColor, className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-foreground/80">{message}</CardDescription>
      </CardContent>
    </Card>
  )
}
