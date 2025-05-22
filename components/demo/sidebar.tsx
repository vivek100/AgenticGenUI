"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { componentDescriptions } from "@/data/component-descriptions"
import { useState } from "react"
import { ComponentDetailsModal } from "./component-details-modal"

interface SidebarProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  handleComponentSelect: (component: string) => void
  clearMessages: () => void
  availableScenarios?: Record<string, any>
  addComponentToChat: (component: string) => void
  setActiveTab: (tab: string) => void
}

export function Sidebar({
  searchTerm,
  setSearchTerm,
  handleComponentSelect,
  clearMessages,
  availableScenarios = {},
  addComponentToChat,
  setActiveTab,
}: SidebarProps) {
  // Add state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  // Get all component names from scenarios
  const allComponents = Object.keys(availableScenarios)

  // Filter components based on search term
  const filteredComponents = allComponents.filter((name) => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    const nameLower = name.toLowerCase()
    const readableName = name.replace(/([A-Z])/g, " $1").toLowerCase()
    const description =
      componentDescriptions[name as keyof typeof componentDescriptions]?.description?.toLowerCase() || ""

    return nameLower.includes(searchLower) || readableName.includes(searchLower) || description.includes(searchLower)
  })

  // Handle component click
  const onComponentClick = (component: string) => {
    setSelectedComponent(component)
    setIsModalOpen(true)
    handleComponentSelect(component) // Keep this for state tracking
  }

  return (
    <div className="w-64 border-r border-border bg-background p-4 h-full overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">AgenticGenUI Demo</h2>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button
          variant="outline"
          className="w-full justify-center font-medium text-primary"
          onClick={() => setActiveTab("integration")}
        >
          How to Integrate
        </Button>

        <h3 className="text-sm font-medium text-muted-foreground">Available Components</h3>
        <div className="mb-2 text-xs text-muted-foreground">
          Showing {filteredComponents.length} of {allComponents.length} components
        </div>
        <div className="grid grid-cols-1 gap-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
          {filteredComponents.map((component) => (
            <Button
              key={component}
              variant="outline"
              className="justify-start"
              onClick={() => onComponentClick(component)}
            >
              {component}
            </Button>
          ))}
        </div>

        <Button variant="secondary" className="w-full mt-4" onClick={clearMessages}>
          Clear Messages
        </Button>
      </div>

      {/* Add the modal component */}
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
