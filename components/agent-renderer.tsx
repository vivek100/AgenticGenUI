"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { getTool } from "@/agentic-ui/ag-ui-client"

interface AgentRendererProps {
  message: any
}

/**
 * AgentRenderer - Renders components based on agent messages
 *
 * This component receives messages from the agent and renders
 * the appropriate UI components based on the message content.
 */
export function AgentRenderer({ message }: AgentRendererProps) {
  const [component, setComponent] = useState<React.ReactNode | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Reset error state on new message
    setError(null)

    try {
      console.log("AgentRenderer received message:", message)

      // Handle different message formats
      let componentType: string | undefined
      let props: Record<string, any> | undefined

      // Case 1: Direct component data from AI
      if (message?.componentType && message?.props) {
        componentType = message.componentType
        props = message.props
      }
      // Case 2: Nested in tool/payload structure
      else if (message?.tool === "renderComponent" && message?.payload) {
        componentType = message.payload.componentType
        props = message.payload.props
      }
      // Case 3: Nested in content structure (from chat history)
      else if (message?.content?.tool === "renderComponent" && message?.content?.payload) {
        componentType = message.content.payload.componentType
        props = message.content.payload.props
      }
      // Case 4: String message
      else if (typeof message === "string") {
        setComponent(<div className="whitespace-pre-wrap">{message}</div>)
        return
      }
      // Case 5: No component data found
      else {
        console.log("No component data found in message")
        setComponent(null)
        return
      }

      // If we have component data, try to render it
      if (componentType && props) {
        // Convert componentType to lowercase for consistency
        const componentTypeLower = componentType.toLowerCase()
        console.log(`Attempting to render component: ${componentTypeLower}`)

        // Map common component name variations
        const componentMap: Record<string, string> = {
          datatable: "dataTable",
          "data-table": "dataTable",
          table: "dataTable",
        }

        // Use the mapped name if available, otherwise use the original
        const mappedType = componentMap[componentTypeLower] || componentTypeLower
        console.log(`Mapped to component: ${mappedType}`)

        // Get the component from the registry
        const Component = getTool(mappedType)

        if (Component) {
          try {
            console.log(`Rendering component ${componentTypeLower} with props:`, props)
            setComponent(<Component {...props} />)
          } catch (err) {
            console.error(`Error rendering component ${componentTypeLower}:`, err)
            setError(`Error rendering component: ${componentTypeLower}`)
          }
        } else {
          console.error(`Component not found: ${componentTypeLower}`)
          console.error(`Available components: ${Object.keys(window.registeredComponents || {}).join(", ")}`)
          setError(`Component not found: ${componentTypeLower}`)
        }
      }
    } catch (err) {
      console.error("Error in AgentRenderer:", err)
      setError(`Error processing message: ${err instanceof Error ? err.message : String(err)}`)
    }
  }, [message])

  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
        <h3 className="font-medium mb-2">Component Error</h3>
        <p>{error}</p>
        <p className="text-xs mt-2">Check the console for more details.</p>
        <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">{JSON.stringify(message, null, 2)}</pre>
      </div>
    )
  }

  if (!component) return null

  return <div className="my-4 max-w-3xl">{component}</div>
}
