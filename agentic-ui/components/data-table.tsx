"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"

export interface DataTableProps {
  title?: string
  description?: string
  data: Array<Record<string, any>>
  columns: Array<{
    key?: string
    label?: string
    header?: string
    accessorKey?: string
  }>
  actions?: {
    edit?: boolean
    delete?: boolean
  }
  className?: string
}

/**
 * DataTable - Displays data rows with optional edit/delete actions
 *
 * Interactive data component that can trigger tool calls
 */
export function DataTable({
  title,
  description,
  data,
  columns,
  actions = { edit: true, delete: true },
  className,
}: DataTableProps) {
  const { callTool } = useAgentActions()
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  const handleEdit = (rowIndex: number, rowData: Record<string, any>) => {
    setSelectedRow(rowIndex)
    callTool("editRow", { id: rowData.id || rowIndex, data: rowData })
  }

  const handleDelete = (rowIndex: number, rowData: Record<string, any>) => {
    callTool("deleteRow", { id: rowData.id || rowIndex })
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
                {columns.map((column, idx) => (
                  <TableHead key={column.key || column.accessorKey || idx}>
                    {column.label || column.header || `Column ${idx + 1}`}
                  </TableHead>
                ))}
                {(actions.edit || actions.delete) && <TableHead className="w-[100px]">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (actions.edit || actions.delete ? 1 : 0)}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className={cn(selectedRow === rowIndex && "bg-muted/50")}>
                    {columns.map((column, idx) => {
                      const key = column.key || column.accessorKey || idx
                      return <TableCell key={key}>{row[key] !== undefined ? String(row[key]) : "—"}</TableCell>
                    })}
                    {(actions.edit || actions.delete) && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {actions.edit && (
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(rowIndex, row)}>
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          )}
                          {actions.delete && (
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(rowIndex, row)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
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
