"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"

export interface EditableDataTableProps {
  title: string
  description?: string
  columns?: Array<{
    id?: string
    key?: string
    label?: string
    header?: string
    accessorKey?: string
    type?: "text" | "number" | "select"
    options?: string[] // For select type
    editable?: boolean
  }>
  rows?: Array<Record<string, any>>
  data?: Array<Record<string, any>>
  className?: string
}

/**
 * EditableDataTable - Table with in-place cell editing
 *
 * Interactive data component that allows editing cell values directly
 */
export function EditableDataTable({
  title,
  description,
  columns = [],
  rows: initialRows,
  data: initialData,
  className,
}: EditableDataTableProps) {
  // Normalize columns to have consistent properties
  const normalizedColumns = columns.map((col) => ({
    key: col.key || col.accessorKey || col.id || "",
    label: col.label || col.header || "",
    type: col.type || "text",
    options: col.options || [],
    editable: col.editable || false,
  }))

  // Use data prop if provided, otherwise use rows prop
  const initialItems = initialData || initialRows || []

  const { callTool } = useAgentActions()
  const [rows, setRows] = useState(initialItems)
  const [editCell, setEditCell] = useState<{ rowIndex: number; columnKey: string } | null>(null)
  const [editValue, setEditValue] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when editing starts
  useEffect(() => {
    if (editCell && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editCell])

  const handleCellClick = (rowIndex: number, columnKey: string, value: any) => {
    const column = normalizedColumns.find((col) => col.key === columnKey)
    if (!column?.editable) return

    setEditCell({ rowIndex, columnKey })
    setEditValue(String(value ?? ""))
  }

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  const handleSelectChange = (value: string) => {
    setEditValue(value)
  }

  const handleSaveEdit = () => {
    if (!editCell) return

    const { rowIndex, columnKey } = editCell
    const column = normalizedColumns.find((col) => col.key === columnKey)

    // Convert value based on column type
    let finalValue: any = editValue
    if (column?.type === "number") {
      finalValue = Number(editValue)
    }

    // Update the row data
    const updatedRows = [...rows]
    if (updatedRows[rowIndex]) {
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        [columnKey]: finalValue,
      }

      setRows(updatedRows)

      // Notify the agent
      callTool("updateTableCell", {
        rowIndex,
        columnKey,
        oldValue: rows[rowIndex][columnKey],
        newValue: finalValue,
        rowData: updatedRows[rowIndex],
      })
    }

    // Reset edit state
    setEditCell(null)
    setEditValue("")
  }

  const handleCancelEdit = () => {
    setEditCell(null)
    setEditValue("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit()
    } else if (e.key === "Escape") {
      handleCancelEdit()
    }
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {normalizedColumns.map((column) => (
                  <TableHead key={column.key}>
                    {column.label}
                    {column.editable && <span className="ml-1 text-xs text-muted-foreground">(Editable)</span>}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {!rows || rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={normalizedColumns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, rowIndex) => (
                  <TableRow key={row.id || `row-${rowIndex}`}>
                    {normalizedColumns.map((column) => (
                      <TableCell key={`${rowIndex}-${column.key}`}>
                        {editCell?.rowIndex === rowIndex && editCell?.columnKey === column.key ? (
                          <div className="flex items-center gap-1">
                            {column.type === "select" ? (
                              <Select value={editValue} onValueChange={handleSelectChange}>
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {column.options?.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input
                                ref={inputRef}
                                type={column.type || "text"}
                                value={editValue}
                                onChange={handleCellChange}
                                onKeyDown={handleKeyDown}
                                className="h-8 w-full"
                              />
                            )}
                            <div className="flex gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={handleSaveEdit}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={handleCancelEdit}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className={cn(
                              "py-1 px-2 rounded -mx-2",
                              column.editable && "hover:bg-muted cursor-pointer",
                            )}
                            onClick={() => handleCellClick(rowIndex, column.key, row[column.key])}
                          >
                            {row[column.key] !== undefined ? String(row[column.key]) : "—"}
                          </div>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
