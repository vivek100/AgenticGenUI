"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { componentDescriptions } from "@/data/component-descriptions"
import { AgentRenderer } from "@/components/agent-renderer"

interface ComponentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  componentName: string | null
  addComponentToChat: (component: string) => void
  availableScenarios?: Record<string, any>
}

export function ComponentDetailsModal({
  isOpen,
  onClose,
  componentName,
  addComponentToChat,
  availableScenarios = {},
}: ComponentDetailsModalProps) {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Reset error when component name changes
    setError(null)
  }, [componentName])

  if (!componentName) return null

  const scenarioData = availableScenarios[componentName]
  if (!scenarioData) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Component Not Found</DialogTitle>
            <DialogDescription>Could not find scenario data for the {componentName} component.</DialogDescription>
          </DialogHeader>
          <div className="text-center p-12 border rounded-lg bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800">
            <h3 className="text-lg font-medium text-red-800 dark:text-red-300">Component scenario not found</h3>
            <p className="text-red-600 dark:text-red-400 mt-2">
              Could not find scenario data for the {componentName} component.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{componentName}</DialogTitle>
          <DialogDescription>Component details and usage information</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold dark:text-white">{componentName}</h2>
            <Button
              onClick={() => {
                addComponentToChat(componentName)
                onClose()
              }}
            >
              Add to Chat
            </Button>
          </div>

          {/* Description - Full width row */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent className="dark:text-slate-200">
              <p>
                {componentDescriptions[componentName as keyof typeof componentDescriptions]?.description ||
                  "No description available."}
              </p>
            </CardContent>
          </Card>

          {/* Component Preview - Full width row */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Component Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex justify-center bg-slate-50 dark:bg-slate-900 rounded-md">
              <div className="w-full max-w-3xl">
                {/* Use AgentRenderer to render the component */}
                <AgentRenderer message={scenarioData} />
              </div>
            </CardContent>
          </Card>

          {/* Example Usage - Full width row */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Example Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                <code>{`// Example of rendering the ${componentName} component
{
  tool: "renderComponent",
  payload: {
    componentType: "${componentName.toLowerCase()}",
    props: ${JSON.stringify(scenarioData.payload.props, null, 2)}
  }
}`}</code>
              </pre>
            </CardContent>
          </Card>

          {/* Props - Full width row */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Props</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-2 text-left font-medium">Name</th>
                      <th className="p-2 text-left font-medium">Type</th>
                      <th className="p-2 text-left font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {componentDescriptions[componentName as keyof typeof componentDescriptions]?.props?.map(
                      (prop, i) => (
                        <tr key={i}>
                          <td className="p-2 font-mono text-sm">{prop.name}</td>
                          <td className="p-2 font-mono text-sm text-muted-foreground">{prop.type}</td>
                          <td className="p-2 text-sm">{prop.description}</td>
                        </tr>
                      ),
                    ) || (
                      <tr>
                        <td colSpan={3} className="p-2 text-center text-muted-foreground">
                          No props information available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Tool Calls - Full width row (conditional) */}
          {componentDescriptions[componentName as keyof typeof componentDescriptions]?.toolCalls?.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Tool Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-2 text-left font-medium">Name</th>
                        <th className="p-2 text-left font-medium">Arguments</th>
                        <th className="p-2 text-left font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {componentDescriptions[componentName as keyof typeof componentDescriptions]?.toolCalls?.map(
                        (tool, i) => (
                          <tr key={i}>
                            <td className="p-2 font-mono text-sm">{tool.name}</td>
                            <td className="p-2 font-mono text-sm text-muted-foreground">{tool.args}</td>
                            <td className="p-2 text-sm">{tool.description}</td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Responses - Full width row (conditional) */}
          {componentDescriptions[componentName as keyof typeof componentDescriptions]?.responses?.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-2 text-left font-medium">Type</th>
                        <th className="p-2 text-left font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {componentDescriptions[componentName as keyof typeof componentDescriptions]?.responses?.map(
                        (response, i) => (
                          <tr key={i}>
                            <td className="p-2 font-mono text-sm">{response.type}</td>
                            <td className="p-2 text-sm">{response.description}</td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
