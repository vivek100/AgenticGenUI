import type React from "react"
import { MetricCard } from "./metric-card"
import { DollarSign, Users, PlusCircle, Clock } from "lucide-react"

interface Metric {
  name: string
  value: string | number
  icon?: string
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export interface MetricCardGridProps {
  metrics: Metric[]
  className?: string
}

const iconMap: Record<string, React.ReactNode> = {
  money: <DollarSign className="h-4 w-4" />,
  users: <Users className="h-4 w-4" />,
  create: <PlusCircle className="h-4 w-4" />,
  clock: <Clock className="h-4 w-4" />,
}

/**
 * MetricCardGrid - Displays multiple metric cards in a responsive grid
 *
 * Display-only component for showing multiple KPIs and metrics
 */
export function MetricCardGrid({ metrics, className }: MetricCardGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className || ""}`}>
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.name}
          value={metric.value}
          description={metric.description}
          trend={metric.trend}
          icon={metric.icon ? iconMap[metric.icon] : undefined}
        />
      ))}
    </div>
  )
}
