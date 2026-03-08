import { PanelActionType } from '@/types/panel';

/**
 * Parses a message to check if it contains panel actions
 * @param message The message to parse
 * @returns An array of panel actions if found, or null if no panel actions are found
 */
export function parsePanelActions(message: any): PanelActionType[] | null {
  try {
    // Check if the message is a direct panel action
    if (message && typeof message === 'object' && message.action) {
      if (isPanelAction(message)) {
        return [message as PanelActionType];
      }
    }
    
    // Check if the message contains panel actions in a tool/payload structure
    if (message?.tool === 'panelAction' && message?.payload) {
      if (Array.isArray(message.payload)) {
        // Multiple actions
        const validActions = message.payload.filter(isPanelAction);
        if (validActions.length > 0) {
          return validActions as PanelActionType[];
        }
      } else if (isPanelAction(message.payload)) {
        // Single action
        return [message.payload as PanelActionType];
      }
    }
    
    // Check if the message contains panel actions in content
    if (message?.content?.tool === 'panelAction' && message?.content?.payload) {
      if (Array.isArray(message.content.payload)) {
        // Multiple actions
        const validActions = message.content.payload.filter(isPanelAction);
        if (validActions.length > 0) {
          return validActions as PanelActionType[];
        }
      } else if (isPanelAction(message.content.payload)) {
        // Single action
        return [message.content.payload as PanelActionType];
      }
    }
    
    // Try to find panel actions in JSON strings
    if (typeof message === 'string') {
      try {
        const parsed = JSON.parse(message);
        if (isPanelAction(parsed)) {
          return [parsed as PanelActionType];
        }
        
        if (parsed.tool === 'panelAction' && parsed.payload) {
          if (Array.isArray(parsed.payload)) {
            const validActions = parsed.payload.filter(isPanelAction);
            if (validActions.length > 0) {
              return validActions as PanelActionType[];
            }
          } else if (isPanelAction(parsed.payload)) {
            return [parsed.payload as PanelActionType];
          }
        }
      } catch (e) {
        // Not valid JSON, continue
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing panel actions:', error);
    return null;
  }
}

/**
 * Checks if an object is a valid panel action
 * @param obj The object to check
 * @returns True if the object is a valid panel action, false otherwise
 */
function isPanelAction(obj: any): boolean {
  if (!obj || typeof obj !== 'object' || !obj.action) {
    return false;
  }
  
  // List of valid panel actions
  const validActions = [
    'addTab',
    'removeTab',
    'renameTab',
    'reorderTabs',
    'switchTab',
    'addZone',
    'removeZone',
    'reorderZones',
    'addComponent',
    'removeComponent',
    'updateComponent',
    'reorderComponents',
    'setPanelState',
    'undo',
    'redo'
  ];
  
  // Check if the action is valid
  if (!validActions.includes(obj.action)) {
    return false;
  }
  
  // Validate required fields based on action type
  switch (obj.action) {
    case 'addTab':
      return !!obj.tab && typeof obj.tab === 'object' && 
             !!obj.tab.id && !!obj.tab.title && Array.isArray(obj.tab.zones);
    
    case 'removeTab':
    case 'switchTab':
      return !!obj.tabId && typeof obj.tabId === 'string';
    
    case 'renameTab':
      return !!obj.tabId && typeof obj.tabId === 'string' && 
             !!obj.title && typeof obj.title === 'string';
    
    case 'reorderTabs':
      return Array.isArray(obj.tabIds);
    
    case 'addZone':
      return !!obj.tabId && typeof obj.tabId === 'string' && 
             !!obj.zone && typeof obj.zone === 'object' && 
             !!obj.zone.id && Array.isArray(obj.zone.components);
    
    case 'removeZone':
      return !!obj.tabId && typeof obj.tabId === 'string' && 
             !!obj.zoneId && typeof obj.zoneId === 'string';
    
    case 'reorderZones':
      return !!obj.tabId && typeof obj.tabId === 'string' && 
             Array.isArray(obj.zoneIds);
    
    case 'addComponent':
      return !!obj.tabId && typeof obj.tabId === 'string' && 
             !!obj.zoneId && typeof obj.zoneId === 'string' && 
             !!obj.component && typeof obj.component === 'object' && 
             !!obj.component.id && !!obj.component.type && 
             !!obj.component.props && typeof obj.component.props === 'object';
    
    case 'removeComponent':
      return !!obj.tabId && typeof obj.tabId === 'string' && 
             !!obj.zoneId && typeof obj.zoneId === 'string' && 
             !!obj.componentId && typeof obj.componentId === 'string';
    
    case 'updateComponent':
      return !!obj.tabId && typeof obj.tabId === 'string' && 
             !!obj.zoneId && typeof obj.zoneId === 'string' && 
             !!obj.componentId && typeof obj.componentId === 'string' && 
             (!!obj.type || !!obj.props);
    
    case 'reorderComponents':
      return !!obj.tabId && typeof obj.tabId === 'string' && 
             !!obj.zoneId && typeof obj.zoneId === 'string' && 
             Array.isArray(obj.componentIds);
    
    case 'setPanelState':
      return !!obj.state && typeof obj.state === 'object' && 
             Array.isArray(obj.state.tabs) && 
             (obj.state.activeTabId === null || typeof obj.state.activeTabId === 'string');
    
    case 'undo':
    case 'redo':
      return true;
    
    default:
      return false;
  }
}