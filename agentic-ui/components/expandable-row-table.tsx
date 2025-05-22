"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"

export interface ExpandableRowTableProps {
  title: string
  description?: string
  columns: Array<{
    key: string
    label: string
  }>
  rows: Array<Record<string, any>>
  expandRenderer: (row: Record<string, any>) => React.ReactNode
  className?: string
}

/**
 * ExpandableRowTable - Table with expandable rows for detailed view
 *
 * Interactive data component that shows additional details when a row is expanded
 */
export function ExpandableRowTable({
  title,
  description,
  columns,
  rows,
  expandRenderer,
  className,
}: ExpandableRowTableProps) {
  const { callTool } = useAgentActions()
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({})

  const toggleRow = (rowIndex: number) => {
    const newExpandedRows = { ...expandedRows }
    newExpandedRows[rowIndex] = !expandedRows[rowIndex]
    setExpandedRows(newExpandedRows)

    // Notify the agent
    callTool("toggleRowExpand", {
      rowIndex,
      expanded: !expandedRows[rowIndex],
      rowData: rows[rowIndex],
    })
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
                <TableHead className="w-[40px]"></TableHead>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, rowIndex) => (
                  <>
                    <TableRow key={rowIndex} className="cursor-pointer" onClick={() => toggleRow(rowIndex)}>
                      <TableCell className="p-2">
                        {expandedRows[rowIndex] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </TableCell>
                      {columns.map((column) => (
                        <TableCell key={column.key}>
                          {row[column.key] !== undefined ? String(row[column.key]) : "—"}
                        </TableCell>
                      ))}
                    </TableRow>
                    {expandedRows[rowIndex] && (
                      <TableRow className="bg-muted/30">
                        <TableCell colSpan={columns.length + 1} className="p-4">
                          {expandRenderer(row)}
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
