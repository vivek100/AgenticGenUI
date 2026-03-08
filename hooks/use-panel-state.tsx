"use client"

import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import {
  PanelState,
  PanelActionType,
  PanelTab,
  PanelZone,
  PanelComponent
} from '@/types/panel';

// Initial state for the panel
const initialPanelState: PanelState = {
  tabs: [],
  activeTabId: null,
  undoStack: [],
  redoStack: []
};

// Create context for panel state
const PanelStateContext = createContext<{
  state: PanelState;
  dispatch: React.Dispatch<PanelActionType>;
  executeAction: (action: PanelActionType) => void;
} | undefined>(undefined);

/**
 * Deep clone an object to ensure immutability
 */
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Panel state reducer function
 */
function panelReducer(state: PanelState, action: PanelActionType): PanelState {
  // Create a copy of the current state for the undo stack (excluding undo/redo actions)
  const shouldAddToUndoStack = action.action !== 'undo' && action.action !== 'redo';
  
  // Helper function to create a new state with updated undo stack
  const createNewState = (updatedState: Partial<PanelState>): PanelState => {
    const newState = {
      ...state,
      ...updatedState
    };
    
    if (shouldAddToUndoStack) {
      // Add current state to undo stack
      const currentState = deepClone({
        tabs: state.tabs,
        activeTabId: state.activeTabId
      });
      
      return {
        ...newState,
        undoStack: [...state.undoStack, currentState as PanelState],
        redoStack: [] // Clear redo stack on new action
      };
    }
    
    return newState;
  };

  // Handle different action types
  switch (action.action) {
    // Tab Actions
    case 'addTab': {
      const newTabs = [...state.tabs, action.tab];
      const activeTabId = state.activeTabId || action.tab.id;
      return createNewState({ tabs: newTabs, activeTabId });
    }
    
    case 'removeTab': {
      const newTabs = state.tabs.filter(tab => tab.id !== action.tabId);
      let activeTabId = state.activeTabId;
      
      // If the active tab is being removed, select another tab
      if (activeTabId === action.tabId) {
        activeTabId = newTabs.length > 0 ? newTabs[0].id : null;
      }
      
      return createNewState({ tabs: newTabs, activeTabId });
    }
    
    case 'renameTab': {
      const newTabs = state.tabs.map(tab => 
        tab.id === action.tabId ? { ...tab, title: action.title } : tab
      );
      return createNewState({ tabs: newTabs });
    }
    
    case 'reorderTabs': {
      // Create a map for quick lookup
      const tabMap = new Map(state.tabs.map(tab => [tab.id, tab]));
      
      // Create new tabs array in the specified order
      const newTabs = action.tabIds
        .filter(id => tabMap.has(id))
        .map(id => tabMap.get(id)!)
        .concat(state.tabs.filter(tab => !action.tabIds.includes(tab.id)));
      
      return createNewState({ tabs: newTabs });
    }
    
    case 'switchTab': {
      // Only update if the tab exists
      const tabExists = state.tabs.some(tab => tab.id === action.tabId);
      if (!tabExists) return state;
      
      return createNewState({ activeTabId: action.tabId });
    }
    
    // Zone Actions
    case 'addZone': {
      const newTabs = state.tabs.map(tab => {
        if (tab.id === action.tabId) {
          return {
            ...tab,
            zones: [...tab.zones, action.zone]
          };
        }
        return tab;
      });
      
      return createNewState({ tabs: newTabs });
    }
    
    case 'removeZone': {
      const newTabs = state.tabs.map(tab => {
        if (tab.id === action.tabId) {
          return {
            ...tab,
            zones: tab.zones.filter(zone => zone.id !== action.zoneId)
          };
        }
        return tab;
      });
      
      return createNewState({ tabs: newTabs });
    }
    
    case 'reorderZones': {
      const newTabs = state.tabs.map(tab => {
        if (tab.id === action.tabId) {
          // Create a map for quick lookup
          const zoneMap = new Map(tab.zones.map(zone => [zone.id, zone]));
          
          // Create new zones array in the specified order
          const newZones = action.zoneIds
            .filter(id => zoneMap.has(id))
            .map(id => zoneMap.get(id)!)
            .concat(tab.zones.filter(zone => !action.zoneIds.includes(zone.id)));
          
          return { ...tab, zones: newZones };
        }
        return tab;
      });
      
      return createNewState({ tabs: newTabs });
    }
    
    // Component Actions
    case 'addComponent': {
      const newTabs = state.tabs.map(tab => {
        if (tab.id === action.tabId) {
          return {
            ...tab,
            zones: tab.zones.map(zone => {
              if (zone.id === action.zoneId) {
                return {
                  ...zone,
                  components: [...zone.components, action.component]
                };
              }
              return zone;
            })
          };
        }
        return tab;
      });
      
      return createNewState({ tabs: newTabs });
    }
    
    case 'removeComponent': {
      const newTabs = state.tabs.map(tab => {
        if (tab.id === action.tabId) {
          return {
            ...tab,
            zones: tab.zones.map(zone => {
              if (zone.id === action.zoneId) {
                return {
                  ...zone,
                  components: zone.components.filter(comp => comp.id !== action.componentId)
                };
              }
              return zone;
            })
          };
        }
        return tab;
      });
      
      return createNewState({ tabs: newTabs });
    }
    
    case 'updateComponent': {
      const newTabs = state.tabs.map(tab => {
        if (tab.id === action.tabId) {
          return {
            ...tab,
            zones: tab.zones.map(zone => {
              if (zone.id === action.zoneId) {
                return {
                  ...zone,
                  components: zone.components.map(comp => {
                    if (comp.id === action.componentId) {
                      return {
                        ...comp,
                        ...(action.type && { type: action.type }),
                        ...(action.props && { props: { ...comp.props, ...action.props } })
                      };
                    }
                    return comp;
                  })
                };
              }
              return zone;
            })
          };
        }
        return tab;
      });
      
      return createNewState({ tabs: newTabs });
    }
    
    case 'reorderComponents': {
      const newTabs = state.tabs.map(tab => {
        if (tab.id === action.tabId) {
          return {
            ...tab,
            zones: tab.zones.map(zone => {
              if (zone.id === action.zoneId) {
                // Create a map for quick lookup
                const componentMap = new Map(zone.components.map(comp => [comp.id, comp]));
                
                // Create new components array in the specified order
                const newComponents = action.componentIds
                  .filter(id => componentMap.has(id))
                  .map(id => componentMap.get(id)!)
                  .concat(zone.components.filter(comp => !action.componentIds.includes(comp.id)));
                
                return { ...zone, components: newComponents };
              }
              return zone;
            })
          };
        }
        return tab;
      });
      
      return createNewState({ tabs: newTabs });
    }
    
    // Bulk/Advanced Actions
    case 'setPanelState': {
      return createNewState({
        tabs: action.state.tabs,
        activeTabId: action.state.activeTabId
      });
    }
    
    case 'undo': {
      if (state.undoStack.length === 0) return state;
      
      // Get the last state from the undo stack
      const previousState = state.undoStack[state.undoStack.length - 1];
      const newUndoStack = state.undoStack.slice(0, -1);
      
      // Add current state to redo stack
      const currentState = {
        tabs: state.tabs,
        activeTabId: state.activeTabId
      };
      
      return {
        tabs: previousState.tabs,
        activeTabId: previousState.activeTabId,
        undoStack: newUndoStack,
        redoStack: [...state.redoStack, currentState as PanelState]
      };
    }
    
    case 'redo': {
      if (state.redoStack.length === 0) return state;
      
      // Get the last state from the redo stack
      const nextState = state.redoStack[state.redoStack.length - 1];
      const newRedoStack = state.redoStack.slice(0, -1);
      
      // Add current state to undo stack
      const currentState = {
        tabs: state.tabs,
        activeTabId: state.activeTabId
      };
      
      return {
        tabs: nextState.tabs,
        activeTabId: nextState.activeTabId,
        undoStack: [...state.undoStack, currentState as PanelState],
        redoStack: newRedoStack
      };
    }
    
    default:
      console.warn('Unknown panel action:', action);
      return state;
  }
}

/**
 * Provider component for panel state
 */
export function PanelStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(panelReducer, initialPanelState);
  
  // Helper function to execute an action and handle errors
  const executeAction = useCallback((action: PanelActionType) => {
    try {
      console.log('Executing panel action:', action);
      dispatch(action);
    } catch (error) {
      console.error('Error executing panel action:', error);
    }
  }, []);
  
  return (
    <PanelStateContext.Provider value={{ state, dispatch, executeAction }}>
      {children}
    </PanelStateContext.Provider>
  );
}

/**
 * Hook to use panel state
 */
export function usePanelState() {
  const context = useContext(PanelStateContext);
  if (context === undefined) {
    throw new Error('usePanelState must be used within a PanelStateProvider');
  }
  return context;
}

/**
 * Helper functions for common panel operations
 */
export function usePanelActions() {
  const { executeAction } = usePanelState();
  
  // Tab actions
  const addTab = useCallback((tab: PanelTab) => {
    executeAction({ action: 'addTab', tab });
  }, [executeAction]);
  
  const removeTab = useCallback((tabId: string) => {
    executeAction({ action: 'removeTab', tabId });
  }, [executeAction]);
  
  const renameTab = useCallback((tabId: string, title: string) => {
    executeAction({ action: 'renameTab', tabId, title });
  }, [executeAction]);
  
  const reorderTabs = useCallback((tabIds: string[]) => {
    executeAction({ action: 'reorderTabs', tabIds });
  }, [executeAction]);
  
  const switchTab = useCallback((tabId: string) => {
    executeAction({ action: 'switchTab', tabId });
  }, [executeAction]);
  
  // Zone actions
  const addZone = useCallback((tabId: string, zone: PanelZone) => {
    executeAction({ action: 'addZone', tabId, zone });
  }, [executeAction]);
  
  const removeZone = useCallback((tabId: string, zoneId: string) => {
    executeAction({ action: 'removeZone', tabId, zoneId });
  }, [executeAction]);
  
  const reorderZones = useCallback((tabId: string, zoneIds: string[]) => {
    executeAction({ action: 'reorderZones', tabId, zoneIds });
  }, [executeAction]);
  
  // Component actions
  const addComponent = useCallback((tabId: string, zoneId: string, component: PanelComponent) => {
    executeAction({ action: 'addComponent', tabId, zoneId, component });
  }, [executeAction]);
  
  const removeComponent = useCallback((tabId: string, zoneId: string, componentId: string) => {
    executeAction({ action: 'removeComponent', tabId, zoneId, componentId });
  }, [executeAction]);
  
  const updateComponent = useCallback((
    tabId: string,
    zoneId: string,
    componentId: string,
    type?: string,
    props?: Record<string, any>
  ) => {
    executeAction({ action: 'updateComponent', tabId, zoneId, componentId, type, props });
  }, [executeAction]);
  
  const reorderComponents = useCallback((tabId: string, zoneId: string, componentIds: string[]) => {
    executeAction({ action: 'reorderComponents', tabId, zoneId, componentIds });
  }, [executeAction]);
  
  // Bulk/Advanced actions
  const setPanelState = useCallback((state: Omit<PanelState, 'undoStack' | 'redoStack'>) => {
    executeAction({ action: 'setPanelState', state });
  }, [executeAction]);
  
  const undo = useCallback(() => {
    executeAction({ action: 'undo' });
  }, [executeAction]);
  
  const redo = useCallback(() => {
    executeAction({ action: 'redo' });
  }, [executeAction]);
  
  return {
    addTab,
    removeTab,
    renameTab,
    reorderTabs,
    switchTab,
    addZone,
    removeZone,
    reorderZones,
    addComponent,
    removeComponent,
    updateComponent,
    reorderComponents,
    setPanelState,
    undo,
    redo
  };
}