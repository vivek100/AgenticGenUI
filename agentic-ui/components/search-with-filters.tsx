"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { Search, X } from "lucide-react"

export interface Filter {
  id: string
  label: string
  value: string
  active?: boolean
}

export interface SearchWithFiltersProps {
  title: string
  description?: string
  placeholder?: string
  filters: Filter[]
  className?: string
}

/**
 * SearchWithFilters - Search input with filter chips
 *
 * Actionable component that triggers a search with filters
 */
export function SearchWithFilters({
  title,
  description,
  placeholder = "Search...",
  filters,
  className,
}: SearchWithFiltersProps) {
  const { callTool } = useAgentActions()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>(filters.filter((f) => f.active).map((f) => f.id))

  const handleSearch = () => {
    const activeFilterObjects = filters.filter((f) => activeFilters.includes(f.id))
    callTool("searchWithFilters", {
      searchTerm,
      filters: activeFilterObjects,
    })
  }

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  const clearSearch = () => {
    setSearchTerm("")
    setActiveFilters([])
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={placeholder}
              className="pl-9 pr-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Badge
              key={filter.id}
              variant={activeFilters.includes(filter.id) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleFilter(filter.id)}
            >
              {filter.label}
              {activeFilters.includes(filter.id) && (
                <X
                  className="ml-1 h-3 w-3"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFilter(filter.id)
                  }}
                />
              )}
            </Badge>
          ))}
          {activeFilters.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearSearch} className="h-6 px-2 text-xs">
              Clear all
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
