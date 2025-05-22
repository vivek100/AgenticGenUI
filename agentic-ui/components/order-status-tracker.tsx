import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CheckCircle2, Clock, Package, Truck } from "lucide-react"

export interface OrderStatusTrackerProps {
  title: string
  description?: string
  status: string
  steps: Array<{
    id: string
    label: string
    description?: string
    date?: string
    icon?: "order" | "processing" | "shipping" | "delivered"
  }>
  className?: string
}

/**
 * OrderStatusTracker - Tracks order status through defined steps
 *
 * Display-only component for showing order progress
 */
export function OrderStatusTracker({ title, description, status, steps, className }: OrderStatusTrackerProps) {
  // Find the current step index
  const currentStepIndex = steps.findIndex((step) => step.id === status)

  // Get icon for a step
  const getStepIcon = (step: { icon?: "order" | "processing" | "shipping" | "delivered" }, isActive: boolean) => {
    const iconClass = cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")

    switch (step.icon) {
      case "order":
        return <Clock className={iconClass} />
      case "processing":
        return <Package className={iconClass} />
      case "shipping":
        return <Truck className={iconClass} />
      case "delivered":
        return <CheckCircle2 className={iconClass} />
      default:
        return <Clock className={iconClass} />
    }
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3.5 top-0 h-full w-px bg-muted" />

          <div className="space-y-8">
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex
              const isActive = index === currentStepIndex

              return (
                <div key={step.id} className="relative pl-10">
                  {/* Step indicator */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border-2",
                      isCompleted ? "border-primary bg-primary text-primary-foreground" : "border-muted bg-background",
                    )}
                  >
                    {getStepIcon(step, isCompleted)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center">
                      <h4
                        className={cn(
                          "font-medium",
                          isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {step.label}
                      </h4>
                      {isActive && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          Current
                        </span>
                      )}
                    </div>

                    {step.description && <p className="text-sm text-muted-foreground">{step.description}</p>}

                    {step.date && <p className="text-xs text-muted-foreground">{step.date}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
