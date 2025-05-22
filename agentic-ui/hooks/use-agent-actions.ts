import { callTool, sendResponse } from "../ag-ui-client"

/**
 * Hook for interacting with the agent
 * Provides methods for sending responses and calling tools
 */
export function useAgentActions() {
  return {
    /**
     * Send a response back to the agent
     * @param msg Message to send
     */
    sendAgentResponse: (msg: string) => sendResponse({ type: "agentResponse", payload: msg }),

    /**
     * Call a tool with arguments
     * @param tool Tool name
     * @param args Tool arguments
     */
    callTool: (tool: string, args: any) => callTool({ tool, args }),
  }
}
