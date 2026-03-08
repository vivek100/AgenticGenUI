/**
 * Extension to the AI service to handle panel actions
 * This file contains the modifications needed to extend the parseAIResponse function
 * to support panel actions.
 */

import { parsePanelActions } from './panel-action-service';

/**
 * Extends the parseAIResponse function to handle panel actions
 * This function should be integrated into the existing parseAIResponse function
 * in services/ai-service.ts
 */
export function parseAIResponseWithPanelSupport(response: string): { 
  isComponent: boolean; 
  isPanelAction: boolean;
  content: any;
} {
  try {
    console.log("Raw AI response:", response);

    // First, try to parse as JSON
    let parsedJson: any = null;
    try {
      // Try to find JSON in code blocks
      const jsonCodeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
      const jsonCodeBlockMatch = response.match(jsonCodeBlockRegex);
      
      if (jsonCodeBlockMatch && jsonCodeBlockMatch[1]) {
        const jsonStr = jsonCodeBlockMatch[1].trim();
        parsedJson = JSON.parse(jsonStr);
      } else {
        // Try to parse the entire response as JSON
        parsedJson = JSON.parse(response);
      }
    } catch (err) {
      // Not valid JSON, continue with other parsing methods
    }

    // Check if it's a panel action
    if (parsedJson) {
      const panelActions = parsePanelActions(parsedJson);
      if (panelActions) {
        console.log("Found panel actions:", panelActions);
        return {
          isComponent: false,
          isPanelAction: true,
          content: panelActions
        };
      }
      
      // Check if it's a component
      if (parsedJson.componentType && parsedJson.props) {
        console.log("Found component:", parsedJson);
        return {
          isComponent: true,
          isPanelAction: false,
          content: parsedJson
        };
      }
    }

    // Check the raw response for panel actions
    const panelActions = parsePanelActions(response);
    if (panelActions) {
      console.log("Found panel actions in raw response:", panelActions);
      return {
        isComponent: false,
        isPanelAction: true,
        content: panelActions
      };
    }

    // If we get here, it's not a panel action or component
    // Continue with the original parseAIResponse logic
    // This is a placeholder for integration with the existing function
    return {
      isComponent: false,
      isPanelAction: false,
      content: response
    };
  } catch (error) {
    console.error("Error in parseAIResponseWithPanelSupport:", error);
    return {
      isComponent: false,
      isPanelAction: false,
      content: "I encountered an error processing your request. Please try again."
    };
  }
}