"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ComponentDetailsModal } from "./component-details-modal"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface ExplorerTabProps {
  components?: string[]
  addComponentToChat: (componentName: string) => void
  availableScenarios: any
}

export function ExplorerTab({ components = [], addComponentToChat, availableScenarios }: ExplorerTabProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Get component names from availableScenarios if components array is empty
  const allComponents = components.length > 0 ? components : Object.keys(availableScenarios || {})

  // Filter components based on search query
  const filteredComponents = searchQuery
    ? allComponents.filter((component) => component.toLowerCase().includes(searchQuery.toLowerCase()))
    : allComponents

  const openComponentModal = (componentName: string) => {
    setSelectedComponent(componentName)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search components..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredComponents.map((component) => (
            <Card key={component}>
              <CardHeader>
                <CardTitle>{component}</CardTitle>
                <CardDescription>A UI component for the Agentic UI library</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col space-y-2">
                <Button variant="outline" size="sm" onClick={() => addComponentToChat(component)}>
                  Add to Chat
                </Button>
                <Button variant="outline" size="sm" onClick={() => openComponentModal(component)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}

          {filteredComponents.length === 0 && (
            <div className="col-span-3 p-8 text-center text-muted-foreground">
              No components found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      <ComponentDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        componentName={selectedComponent}
        addComponentToChat={addComponentToChat}
        availableScenarios={availableScenarios}
      />
    </div>
  )
}
