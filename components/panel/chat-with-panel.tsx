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
    
    // Extract tab name if present
    let tabName = '';
    if (lowerInput.includes('named')) {
      const parts = input.split(/named\s+/i);
      if (parts.length > 1) {
        tabName = parts[1].trim().split(/\s+/)[0];
      }
    } else if (lowerInput.includes('dashboard')) {
      tabName = 'Dashboard';
    } else if (lowerInput.includes('create tab') || lowerInput.includes('add tab')) {
      tabName = `Tab ${Math.floor(Math.random() * 100)}`;
    }
    
    // Create a demo tab
    if ((lowerInput.includes('create') || lowerInput.includes('add')) && 
        (lowerInput.includes('tab') || lowerInput.includes('dashboard'))) {
      
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
                content: `# Demo Component
                
## This is a demo component in the panel

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
    // Switch tab
    else if (lowerInput.includes('switch tab') || lowerInput.includes('change tab')) {
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content: "I would switch to another tab if one was specified and existed."
        }
      ]);
    }
    // Add component
    else if (lowerInput.includes('add component') || lowerInput.includes('create component')) {
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content: "I would add a component to a specified tab and zone if they existed."
        }
      ]);
    }
    // General panel info
    else {
      setMessages((prev) => [
        ...prev,
        {
          type: 'assistant',
          content: "The panel with tabs and zones can be controlled by AI actions. Try asking me to 'create a tab named Dashboard' to see a demo."
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