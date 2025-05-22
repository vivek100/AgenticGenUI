/**
 * AG-UI client implementation
 * This is a simplified version of the AG-UI client for demonstration purposes
 */

// Add TypeScript interface for window
declare global {
  interface Window {
    registeredComponents?: Record<string, any>
  }
}

// Store for registered tools
const registeredTools: Record<string, any> = {}

// Make registered tools available globally for debugging
if (typeof window !== "undefined") {
  window.registeredComponents = registeredTools
}

// Event emitter for AG-UI events
type Listener = (event: any) => void
const listeners: Listener[] = []

/**
 * Register a tool with the AG-UI protocol
 * @param name Tool name (lowercase)
 * @param component React component to render
 */
export function registerTool(name: string, component: any) {
  // Ensure name is lowercase for consistency
  const nameLower = name.toLowerCase()
  registeredTools[nameLower] = component
  console.log(`Registered tool: ${nameLower}`)

  // Log total registered tools
  if (typeof window !== "undefined") {
    console.log(`Total registered tools: ${Object.keys(registeredTools).length}`)
    window.registeredComponents = registeredTools
  }
}

/**
 * Get a registered tool by name
 * @param name Tool name
 * @returns The registered component or undefined
 */
export function getTool(name: string) {
  // Ensure name is lowercase for consistency
  const nameLower = name.toLowerCase()
  const component = registeredTools[nameLower]

  if (!component) {
    console.warn(`Tool not found: ${nameLower}`)
    console.warn(`Available tools: ${Object.keys(registeredTools).join(", ")}`)
  }

  return component
}

/**
 * Send a response back to the agent
 * @param response Response data
 */
export function sendResponse(response: any) {
  listeners.forEach((listener) =>
    listener({
      type: "agentResponse",
      payload: response,
    }),
  )
}

/**
 * Call a tool with arguments
 * @param toolCall Tool call data
 */
export function callTool(toolCall: { tool: string; args: any }) {
  listeners.forEach((listener) =>
    listener({
      type: "toolCall",
      payload: toolCall,
    }),
  )
}

/**
 * Subscribe to AG-UI events
 * @param listener Event listener function
 * @returns Unsubscribe function
 */
export function subscribe(listener: Listener) {
  listeners.push(listener)
  return () => {
    const index = listeners.indexOf(listener)
    if (index !== -1) {
      listeners.splice(index, 1)
    }
  }
}
