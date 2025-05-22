"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"

export interface ChecklistItem {
  id: string
  label: string
  checked: boolean
}

export interface ChecklistWithProgressProps {
  title: string
  description?: string
  items: ChecklistItem[]
  className?: string
}

/**
 * ChecklistWithProgress - Interactive checklist with progress indicator
 *
 * Actionable component that triggers updates when items are checked/unchecked
 */
export function ChecklistWithProgress({
  title,
  description,
  items: initialItems,
  className,
}: ChecklistWithProgressProps) {
  const { callTool } = useAgentActions()
  const [items, setItems] = useState<ChecklistItem[]>(initialItems)

  const toggleItem = (id: string) => {
    const updatedItems = items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    setItems(updatedItems)

    const progress = calculateProgress(updatedItems)
    callTool("updateChecklistProgress", {
      items: updatedItems,
      progress,
    })
  }

  const calculateProgress = (items: ChecklistItem[]) => {
    if (items.length === 0) return 0
    const checkedCount = items.filter((item) => item.checked).length
    return Math.round((checkedCount / items.length) * 100)
  }

  const progress = calculateProgress(items)

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="text-sm font-medium">{progress}%</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />

        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={`checklist-item-${item.id}`}
                checked={item.checked}
                onCheckedChange={() => toggleItem(item.id)}
              />
              <label
                htmlFor={`checklist-item-${item.id}`}
                className={cn(
                  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                  item.checked && "line-through text-muted-foreground",
                )}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
