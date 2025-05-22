"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"

export interface DataGridProps {
  title: string
  description?: string
  columns: Array<{
    key: string
    label: string
    sortable?: boolean
  }>
  rows: Array<Record<string, any>>
  pageSize?: number
  className?: string
}

/**
 * DataGrid - Full-width, paginated, sortable grid
 *
 * Interactive data component with pagination and sorting
 */
export function DataGrid({ title, description, columns, rows, pageSize = 5, className }: DataGridProps) {
  const { callTool } = useAgentActions()
  const [currentPage, setCurrentPage] = useState(0)
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Calculate total pages
  const totalPages = Math.ceil(rows.length / pageSize)

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage)
      callTool("gridPageChange", { page: newPage })
    }
  }

  // Handle sorting
  const handleSort = (columnKey: string) => {
    const column = columns.find((col) => col.key === columnKey)
    if (!column?.sortable) return

    if (sortColumn === columnKey) {
      // Toggle direction if already sorting by this column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      // Set new sort column and default to ascending
      setSortColumn(columnKey)
      setSortDirection("asc")
    }

    callTool("gridSort", { column: columnKey, direction: sortDirection === "asc" ? "desc" : "asc" })
  }

  // Apply sorting and pagination
  const displayedRows = [...rows]
    .sort((a, b) => {
      if (!sortColumn) return 0

      const valueA = a[sortColumn]
      const valueB = b[sortColumn]

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }

      return sortDirection === "asc" ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1
    })
    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)

  // Handle row click
  const handleRowClick = (rowData: Record<string, any>, index: number) => {
    callTool("gridRowAction", {
      action: "select",
      rowData,
      rowIndex: currentPage * pageSize + index,
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
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={cn(column.sortable && "cursor-pointer hover:bg-muted/50")}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center">
                      {column.label}
                      {column.sortable && (
                        <span className="ml-1">
                          {sortColumn === column.key ? (
                            sortDirection === "asc" ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : (
                              <ArrowDown className="h-4 w-4" />
                            )
                          ) : (
                            <ArrowUpDown className="h-4 w-4 opacity-50" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              ) : (
                displayedRows.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(row, rowIndex)}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {row[column.key] !== undefined ? String(row[column.key]) : "—"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4">
            <div className="text-sm text-muted-foreground">
              Showing {currentPage * pageSize + 1}-{Math.min((currentPage + 1) * pageSize, rows.length)} of{" "}
              {rows.length}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
              </Button>
              <div className="text-sm">
                Page {currentPage + 1} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
