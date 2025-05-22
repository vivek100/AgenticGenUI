"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { GripVertical, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface KanbanTask {
  id: string
  title: string
  description?: string
}

export interface KanbanColumn {
  id: string
  title: string
  tasks: KanbanTask[]
}

export interface KanbanBoardProps {
  title: string
  description?: string
  columns: KanbanColumn[]
  className?: string
}

/**
 * KanbanBoard - Drag-and-drop task board
 *
 * Actionable component that triggers updates when tasks are moved
 */
export function KanbanBoard({ title, description, columns: initialColumns, className }: KanbanBoardProps) {
  const { callTool } = useAgentActions()
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns)
  const [draggedTask, setDraggedTask] = useState<{ task: KanbanTask; columnId: string } | null>(null)

  const handleDragStart = (task: KanbanTask, columnId: string) => {
    setDraggedTask({ task, columnId })
  }

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault()

    if (!draggedTask) return

    const { task, columnId: sourceColumnId } = draggedTask

    if (sourceColumnId === targetColumnId) return

    // Remove from source column
    const updatedColumns = columns.map((column) => {
      if (column.id === sourceColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter((t) => t.id !== task.id),
        }
      }
      return column
    })

    // Add to target column
    const finalColumns = updatedColumns.map((column) => {
      if (column.id === targetColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, task],
        }
      }
      return column
    })

    setColumns(finalColumns)

    // Notify the agent
    callTool("updateKanbanBoard", {
      taskId: task.id,
      sourceColumnId,
      targetColumnId,
      updatedBoard: finalColumns,
    })

    setDraggedTask(null)
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className="bg-muted/50 rounded-md p-3"
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">{column.title}</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {column.tasks.length}
                </span>
              </div>

              <div className="space-y-2 min-h-[100px]">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-background rounded-md p-3 shadow-sm border cursor-move"
                    draggable
                    onDragStart={() => handleDragStart(task, column.id)}
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{task.title}</div>
                        {task.description && (
                          <div className="text-sm text-muted-foreground mt-1">{task.description}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                  <Plus className="h-4 w-4 mr-1" /> Add task
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
