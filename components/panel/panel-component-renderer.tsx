"use client"

import React from 'react';
import { AgentRenderer } from '@/components/agent-renderer';
import { PanelComponent } from '@/types/panel';
import { usePanelActions } from '@/hooks/use-panel-state';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface PanelComponentRendererProps {
  tabId: string;
  zoneId: string;
  component: PanelComponent;
}

/**
 * PanelComponentRenderer - Renders a component within a zone
 * Uses the AgentRenderer to render the actual component
 */
export function PanelComponentRenderer({ tabId, zoneId, component }: PanelComponentRendererProps) {
  const { removeComponent } = usePanelActions();
  
  const handleRemove = () => {
    removeComponent(tabId, zoneId, component.id);
  };
  
  return (
    <div className="relative group">
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={handleRemove}
          title="Remove component"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="relative">
        <AgentRenderer
          message={{
            componentType: component.type,
            props: component.props
          }}
        />
      </div>
    </div>
  );
}