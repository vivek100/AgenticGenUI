"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"

export interface FormField {
  id: string
  label: string
  type: "text" | "number" | "select" | "email" | "tel" | "date"
  required?: boolean
  options?: string[] // For select type
}

export interface CRUDDataTableProps {
  title: string
  description?: string
  columns?: Array<{
    id?: string
    key?: string
    label?: string
    header?: string
    accessorKey?: string
  }>
  rows?: Array<Record<string, any>>
  data?: Array<Record<string, any>>
  formFields?: FormField[]
  formSchema?: FormField[]
  className?: string
}

/**
 * CrudDataTable - Table with Create, Read, Update, Delete operations
 *
 * Interactive data component with modal forms for data operations
 */
export function CrudDataTable({
  title,
  description,
  columns = [],
  rows: initialRows,
  data: initialData,
  formFields: initialFormFields,
  formSchema: initialFormSchema,
  className,
}: CRUDDataTableProps) {
  // Normalize columns to have consistent properties
  const normalizedColumns = columns.map((col) => ({
    key: col.key || col.accessorKey || col.id || "",
    label: col.label || col.header || "",
  }))

  // Use data prop if provided, otherwise use rows prop
  const initialItems = initialData || initialRows || []

  // Use formFields prop if provided, otherwise use formSchema prop
  const formFields = initialFormFields || initialFormSchema || []

  const { callTool } = useAgentActions()
  const [rows, setRows] = useState(initialItems)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})

  const handleCreateClick = () => {
    setFormData({})
    setIsCreateDialogOpen(true)
  }

  const handleEditClick = (rowIndex: number) => {
    setSelectedRowIndex(rowIndex)
    setFormData({ ...rows[rowIndex] })
    setIsEditDialogOpen(true)
  }

  const handleDeleteClick = (rowIndex: number) => {
    setSelectedRowIndex(rowIndex)
    setIsDeleteDialogOpen(true)
  }

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleCreateSubmit = () => {
    // Create a new row with the form data
    const newRow = { ...formData, id: `row-${Date.now()}` }
    const updatedRows = [...rows, newRow]
    setRows(updatedRows)

    // Notify the agent
    callTool("createRecord", {
      record: newRow,
    })

    // Close the dialog
    setIsCreateDialogOpen(false)
    setFormData({})
  }

  const handleEditSubmit = () => {
    if (selectedRowIndex === null) return

    // Update the row with the form data
    const updatedRows = [...rows]
    updatedRows[selectedRowIndex] = { ...formData }
    setRows(updatedRows)

    // Notify the agent
    callTool("editRecord", {
      rowIndex: selectedRowIndex,
      oldData: rows[selectedRowIndex],
      newData: formData,
    })

    // Close the dialog
    setIsEditDialogOpen(false)
    setSelectedRowIndex(null)
    setFormData({})
  }

  const handleDeleteSubmit = () => {
    if (selectedRowIndex === null) return

    // Delete the row
    const deletedRow = rows[selectedRowIndex]
    const updatedRows = rows.filter((_, index) => index !== selectedRowIndex)
    setRows(updatedRows)

    // Notify the agent
    callTool("deleteRecord", {
      rowIndex: selectedRowIndex,
      record: deletedRow,
    })

    // Close the dialog
    setIsDeleteDialogOpen(false)
    setSelectedRowIndex(null)
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Button onClick={handleCreateClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {normalizedColumns.map((column) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!rows || rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={normalizedColumns.length + 1} className="h-24 text-center">
                    No results. Click "Add New" to create a record.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, rowIndex) => (
                  <TableRow key={row.id || `row-${rowIndex}`}>
                    {normalizedColumns.map((column) => (
                      <TableCell key={`${rowIndex}-${column.key}`}>
                        {row[column.key] !== undefined ? String(row[column.key]) : "—"}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(rowIndex)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(rowIndex)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent aria-describedby="create-dialog-description">
          <DialogHeader>
            <DialogTitle>Add New Record</DialogTitle>
            <DialogDescription id="create-dialog-description">
              Fill in the details to create a new record.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {formFields.map((field) => (
              <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field.id} className="text-right">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {field.type === "select" ? (
                  <Select
                    value={formData[field.id] || ""}
                    onValueChange={(value) => handleInputChange(field.id, value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="col-span-3"
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSubmit}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent aria-describedby="edit-dialog-description">
          <DialogHeader>
            <DialogTitle>Edit Record</DialogTitle>
            <DialogDescription id="edit-dialog-description">Make changes to the record details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {formFields.map((field) => (
              <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={field.id} className="text-right">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                {field.type === "select" ? (
                  <Select
                    value={formData[field.id] || ""}
                    onValueChange={(value) => handleInputChange(field.id, value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    value={formData[field.id] || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="col-span-3"
                    required={field.required}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent aria-describedby="delete-dialog-description">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription id="delete-dialog-description">This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <p>Are you sure you want to delete this record?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSubmit}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
