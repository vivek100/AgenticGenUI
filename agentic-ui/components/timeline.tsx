import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface TimelineEvent {
  id: string
  title: string
  description?: string
  timestamp: string
  type?: "default" | "success" | "warning" | "error"
}

export interface TimelineProps {
  title: string
  description?: string
  events: TimelineEvent[]
  className?: string
}

/**
 * Timeline - Displays event logs with timestamps
 *
 * Display-only component for showing activity feeds or history
 */
export function Timeline({ title, description, events, className }: TimelineProps) {
  const typeStyles = {
    default: "bg-gray-200",
    success: "bg-green-200",
    warning: "bg-amber-200",
    error: "bg-red-200",
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {/* Vertical line */}
          <div className="absolute top-0 left-3.5 bottom-0 w-px bg-border" />

          {events.map((event) => (
            <div key={event.id} className="relative pl-8">
              {/* Dot */}
              <div
                className={cn(
                  "absolute left-0 top-1.5 h-7 w-7 rounded-full border-4 border-background",
                  typeStyles[event.type || "default"],
                )}
              />

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{event.title}</h4>
                  <time className="text-xs text-muted-foreground">{event.timestamp}</time>
                </div>
                {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
