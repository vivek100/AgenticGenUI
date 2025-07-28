"use client"

import React, { useRef, useState, useEffect } from 'react';
import { ChatTab } from '@/components/demo/chat-tab';
import { PanelWithTabsZones } from './panel-with-tabs-zones';
import { PanelStateProvider, usePanelState, usePanelActions } from '@/hooks/use-panel-state';
import { parseAIResponseWithPanelSupport } from '@/services/ai-service-panel-extension';
import { PanelActionType } from '@/types/panel';
import { Button } from '@/components/ui/button';
import { PanelLeft, PanelRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  type: 'user' | 'assistant' | 'component' | 'event';
  content: any;
}

interface ChatWithPanelProps {
  initialMessages?: Message[];
  className?: string;
}

/**
 * ChatWithPanelContent - Inner component with access to panel state
 */
function ChatWithPanelContent({ initialMessages = [], className }: ChatWithPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { executeAction } = usePanelState();
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent, modelKey: string) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = { type: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response (in a real app, this would call your API)
    setTimeout(() => {
      // For demo purposes, check if the message contains panel-related keywords
      const lowerInput = input.toLowerCase();
      
      // Check for panel-related keywords or specific commands
      if (lowerInput.includes('panel') || 
          lowerInput.includes('tab') || 
          lowerInput.includes('zone') || 
          lowerInput.includes('create') || 
          lowerInput.includes('add') || 
          lowerInput.includes('dashboard')) {
        // Simulate a panel action response
        handlePanelActionDemo(input);
      } else {
        // Regular text response
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: "I'm a simulated assistant. In a real implementation, I would connect to your backend API and could control the panel with tabs and zones."
          }
        ]);
      }
    }, 1000);
  };
  
  // Demo function to simulate panel actions based on user input
  const handlePanelActionDemo = (input: string) => {
    const lowerInput = input.toLowerCase();
    const { state } = usePanelState();
    
    // Extract tab name if present
    let tabName = '';
    if (lowerInput.includes('named')) {
      const parts = input.split(/named\s+/i);
      if (parts.length > 1) {
        tabName = parts[1].trim().split(/\s+/)[0];
      }
    } else if (lowerInput.includes('dashboard')) {
      tabName = 'Dashboard';
    } else if (lowerInput.includes('analytics')) {
      tabName = 'Analytics';
    } else if (lowerInput.includes('reports')) {
      tabName = 'Reports';
    } else if (lowerInput.includes('create tab') || lowerInput.includes('add tab')) {
      tabName = `Tab ${Math.floor(Math.random() * 100)}`;
    }
    
    // CREATE TAB: Create a new tab
    if ((lowerInput.includes('create') || lowerInput.includes('add')) && 
        (lowerInput.includes('tab') || lowerInput.includes('dashboard') || 
         lowerInput.includes('analytics') || lowerInput.includes('reports'))) {
      
      const tabId = `tab-${Date.now()}`;
      
      // If no tab name was extracted, use a default
      if (!tabName) {
        tabName = `Tab ${Math.floor(Math.random() * 100)}`;
      }
      
      const action: PanelActionType = {
        action: 'addTab',
        tab: {
          id: tabId,
          title: tabName,
          zones: []
        }
      };
      
      // Add a demo zone to the tab
      setTimeout(() => {
        const zoneAction: PanelActionType = {
          action: 'addZone',
          tabId,
          zone: {
            id: `zone-${Date.now()}`,
            components: []
          }
        };
        
        executeAction(zoneAction);
        
        // Add a demo component to the zone
        setTimeout(() => {
          const componentAction: PanelActionType = {
            action: 'addComponent',
            tabId,
            zoneId: zoneAction.zone.id,
            component: {
              id: `component-${Date.now()}`,
              type: 'markdownrenderer',
              props: {
                content: `# ${tabName} Tab
                
## This is a demo component in the ${tabName} tab

This component was added to demonstrate the panel functionality.

- The panel supports multiple tabs
- Each tab can have multiple zones
- Each zone can have multiple components
- Components can be added, removed, and updated by AI actions`
              }
            }
          };
          
          executeAction(componentAction);
        }, 500);
      }, 500);
      
      // Execute the action and add a message
      executeAction(action);
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content: `I've created a new tab named "${tabName}" in the panel with a sample component.`
        }
      ]);
    }
    
    // SWITCH TAB: Switch to a different tab
    else if (lowerInput.includes('switch') || lowerInput.includes('change')) {
      // Find the tab to switch to
      let targetTabId = null;
      let targetTabName = '';
      
      // Check if a specific tab name is mentioned
      for (const tab of state.tabs) {
        if (lowerInput.includes(tab.title.toLowerCase())) {
          targetTabId = tab.id;
          targetTabName = tab.title;
          break;
        }
      }
      
      // If no specific tab is found but there are tabs, switch to the first one
      if (!targetTabId && state.tabs.length > 0) {
        targetTabId = state.tabs[0].id;
        targetTabName = state.tabs[0].title;
      }
      
      if (targetTabId) {
        const action: PanelActionType = {
          action: 'switchTab',
          tabId: targetTabId
        };
        
        executeAction(action);
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: `I've switched to the "${targetTabName}" tab.`
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: "I couldn't find any tabs to switch to. Please create a tab first."
          }
        ]);
      }
    }
    
    // REMOVE TAB: Delete a tab
    else if ((lowerInput.includes('remove') || lowerInput.includes('delete')) && 
             lowerInput.includes('tab')) {
      // Find the tab to remove
      let targetTabId = null;
      let targetTabName = '';
      
      // Check if a specific tab name is mentioned
      for (const tab of state.tabs) {
        if (lowerInput.includes(tab.title.toLowerCase())) {
          targetTabId = tab.id;
          targetTabName = tab.title;
          break;
        }
      }
      
      // If no specific tab is found but there are tabs, remove the active tab
      if (!targetTabId && state.tabs.length > 0) {
        if (state.activeTabId) {
          const activeTab = state.tabs.find(tab => tab.id === state.activeTabId);
          if (activeTab) {
            targetTabId = activeTab.id;
            targetTabName = activeTab.title;
          }
        }
        
        // If still no target, use the first tab
        if (!targetTabId) {
          targetTabId = state.tabs[0].id;
          targetTabName = state.tabs[0].title;
        }
      }
      
      if (targetTabId) {
        const action: PanelActionType = {
          action: 'removeTab',
          tabId: targetTabId
        };
        
        executeAction(action);
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: `I've removed the "${targetTabName}" tab.`
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: "I couldn't find any tabs to remove. Please create a tab first."
          }
        ]);
      }
    }
    
    // ADD COMPONENT: Add a component to a tab
    else if (lowerInput.includes('add component') || lowerInput.includes('create component')) {
      // Find the tab to add the component to
      let targetTabId = null;
      let targetTabName = '';
      let targetZoneId = null;
      
      // Check if a specific tab name is mentioned
      for (const tab of state.tabs) {
        if (lowerInput.includes(tab.title.toLowerCase())) {
          targetTabId = tab.id;
          targetTabName = tab.title;
          
          // Get the first zone in the tab
          if (tab.zones.length > 0) {
            targetZoneId = tab.zones[0].id;
          }
          break;
        }
      }
      
      // If no specific tab is found but there are tabs, use the active tab
      if (!targetTabId && state.tabs.length > 0) {
        if (state.activeTabId) {
          const activeTab = state.tabs.find(tab => tab.id === state.activeTabId);
          if (activeTab) {
            targetTabId = activeTab.id;
            targetTabName = activeTab.title;
            
            // Get the first zone in the tab
            if (activeTab.zones.length > 0) {
              targetZoneId = activeTab.zones[0].id;
            }
          }
        }
        
        // If still no target, use the first tab
        if (!targetTabId) {
          const firstTab = state.tabs[0];
          targetTabId = firstTab.id;
          targetTabName = firstTab.title;
          
          // Get the first zone in the tab
          if (firstTab.zones.length > 0) {
            targetZoneId = firstTab.zones[0].id;
          }
        }
      }
      
      // If we have a tab but no zone, create a zone
      if (targetTabId && !targetZoneId) {
        const zoneId = `zone-${Date.now()}`;
        const zoneAction: PanelActionType = {
          action: 'addZone',
          tabId: targetTabId,
          zone: {
            id: zoneId,
            components: []
          }
        };
        
        executeAction(zoneAction);
        targetZoneId = zoneId;
      }
      
      if (targetTabId && targetZoneId) {
        // Determine component type based on input
        let componentType = 'markdownrenderer';
        let componentProps: any = {
          content: `# New Component
          
This is a new component added to the ${targetTabName} tab.`
        };
        
        // Check for specific component types in the input
        if (lowerInput.includes('chart')) {
          componentType = 'chart';
          componentProps = {
            title: 'Sample Chart',
            type: 'bar',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
              datasets: [
                {
                  label: 'Sales',
                  data: [65, 59, 80, 81, 56],
                  backgroundColor: 'rgba(54, 162, 235, 0.5)'
                }
              ]
            }
          };
        } else if (lowerInput.includes('table')) {
          componentType = 'datatable';
          componentProps = {
            title: 'Sample Table',
            data: [
              { id: 1, name: 'John Doe', email: 'john@example.com' },
              { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
              { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
            ],
            columns: [
              { header: 'ID', accessorKey: 'id' },
              { header: 'Name', accessorKey: 'name' },
              { header: 'Email', accessorKey: 'email' }
            ]
          };
        }
        
        const componentAction: PanelActionType = {
          action: 'addComponent',
          tabId: targetTabId,
          zoneId: targetZoneId,
          component: {
            id: `component-${Date.now()}`,
            type: componentType,
            props: componentProps
          }
        };
        
        executeAction(componentAction);
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: `I've added a new ${componentType} component to the "${targetTabName}" tab.`
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: "I couldn't find any tabs to add a component to. Please create a tab first."
          }
        ]);
      }
    }
    
    // ADD ZONE: Add a new zone to a tab
    else if (lowerInput.includes('add zone') || lowerInput.includes('create zone')) {
      // Find the tab to add the zone to
      let targetTabId = null;
      let targetTabName = '';
      
      // Check if a specific tab name is mentioned
      for (const tab of state.tabs) {
        if (lowerInput.includes(tab.title.toLowerCase())) {
          targetTabId = tab.id;
          targetTabName = tab.title;
          break;
        }
      }
      
      // If no specific tab is found but there are tabs, use the active tab
      if (!targetTabId && state.tabs.length > 0) {
        if (state.activeTabId) {
          const activeTab = state.tabs.find(tab => tab.id === state.activeTabId);
          if (activeTab) {
            targetTabId = activeTab.id;
            targetTabName = activeTab.title;
          }
        }
        
        // If still no target, use the first tab
        if (!targetTabId) {
          targetTabId = state.tabs[0].id;
          targetTabName = state.tabs[0].title;
        }
      }
      
      if (targetTabId) {
        const zoneAction: PanelActionType = {
          action: 'addZone',
          tabId: targetTabId,
          zone: {
            id: `zone-${Date.now()}`,
            components: []
          }
        };
        
        executeAction(zoneAction);
        
        // Add a demo component to the zone
        setTimeout(() => {
          const zoneId = zoneAction.zone.id;
          const componentAction: PanelActionType = {
            action: 'addComponent',
            tabId: targetTabId!,
            zoneId: zoneId,
            component: {
              id: `component-${Date.now()}`,
              type: 'markdownrenderer',
              props: {
                content: `# New Zone
                
This is a new zone added to the ${targetTabName} tab.`
              }
            }
          };
          
          executeAction(componentAction);
        }, 500);
        
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: `I've added a new zone to the "${targetTabName}" tab with a sample component.`
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: "I couldn't find any tabs to add a zone to. Please create a tab first."
          }
        ]);
      }
    }
    
    // RENAME TAB: Rename a tab
    else if (lowerInput.includes('rename') && lowerInput.includes('tab')) {
      // Find the tab to rename
      let targetTabId = null;
      let oldTabName = '';
      let newTabName = '';
      
      // Extract new name if present
      if (lowerInput.includes('to')) {
        const parts = input.split(/\s+to\s+/i);
        if (parts.length > 1) {
          newTabName = parts[1].trim().split(/\s+/)[0];
        }
      }
      
      if (!newTabName) {
        newTabName = `Tab ${Math.floor(Math.random() * 100)}`;
      }
      
      // Check if a specific tab name is mentioned
      for (const tab of state.tabs) {
        if (lowerInput.includes(tab.title.toLowerCase())) {
          targetTabId = tab.id;
          oldTabName = tab.title;
          break;
        }
      }
      
      // If no specific tab is found but there are tabs, use the active tab
      if (!targetTabId && state.tabs.length > 0) {
        if (state.activeTabId) {
          const activeTab = state.tabs.find(tab => tab.id === state.activeTabId);
          if (activeTab) {
            targetTabId = activeTab.id;
            oldTabName = activeTab.title;
          }
        }
        
        // If still no target, use the first tab
        if (!targetTabId) {
          targetTabId = state.tabs[0].id;
          oldTabName = state.tabs[0].title;
        }
      }
      
      if (targetTabId) {
        const action: PanelActionType = {
          action: 'renameTab',
          tabId: targetTabId,
          title: newTabName
        };
        
        executeAction(action);
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: `I've renamed the "${oldTabName}" tab to "${newTabName}".`
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: 'assistant',
            content: "I couldn't find any tabs to rename. Please create a tab first."
          }
        ]);
      }
    }
    
    // UNDO: Undo the last action
    else if (lowerInput.includes('undo')) {
      const action: PanelActionType = {
        action: 'undo'
      };
      
      executeAction(action);
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content: "I've undone the last panel action."
        }
      ]);
    }
    
    // REDO: Redo the last undone action
    else if (lowerInput.includes('redo')) {
      const action: PanelActionType = {
        action: 'redo'
      };
      
      executeAction(action);
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content: "I've redone the last undone panel action."
        }
      ]);
    }
    
    // General panel info
    else {
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content: `The panel with tabs and zones can be controlled by AI actions. Try these commands:
          
- "Create a tab named Dashboard"
- "Add a component to the Dashboard tab"
- "Add a zone to the Dashboard tab"
- "Switch to the Dashboard tab"
- "Rename the Dashboard tab to Analytics"
- "Remove the Analytics tab"
- "Undo the last action"
- "Redo the last undone action"`
        }
      ]);
    }
  };
  
  return (
    <div className={cn("flex h-full", className)}>
      <div className={cn(
        "flex-1 transition-all duration-300",
        isPanelVisible ? "mr-4" : ""
      )}>
        <ChatTab
          messages={messages}
          input={input}
          setInput={setInput}
          handleSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
        />
      </div>
      
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPanelVisible(!isPanelVisible)}
          className="h-8 w-8"
          title={isPanelVisible ? "Hide panel" : "Show panel"}
        >
          {isPanelVisible ? <PanelRight className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className={cn(
        "transition-all duration-300 overflow-hidden",
        isPanelVisible ? "w-80" : "w-0"
      )}>
        {isPanelVisible && <PanelWithTabsZones className="h-full" />}
      </div>
    </div>
  );
}

/**
 * ChatWithPanel - Main component that wraps the content with PanelStateProvider
 */
export function ChatWithPanel(props: ChatWithPanelProps) {
  return (
    <PanelStateProvider>
      <ChatWithPanelContent {...props} />
    </PanelStateProvider>
  );
}