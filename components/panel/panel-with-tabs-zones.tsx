"use client"

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Undo, Redo } from 'lucide-react';
import { usePanelState, usePanelActions } from '@/hooks/use-panel-state';
import { PanelZoneComponent } from './panel-zone';
import { cn } from '@/lib/utils';

interface PanelWithTabsZonesProps {
  className?: string;
}

/**
 * PanelWithTabsZones - Main component for the AI-controlled panel with tabs and zones
 */
export function PanelWithTabsZones({ className }: PanelWithTabsZonesProps) {
  const { state } = usePanelState();
  const { switchTab, undo, redo } = usePanelActions();
  
  // If there are no tabs, show an empty state
  if (state.tabs.length === 0) {
    return (
      <Card className={cn("h-full flex flex-col", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Panel</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <p>No panel content available.</p>
            <p className="text-sm">The AI can add content to this panel.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Handle tab change
  const handleTabChange = (tabId: string) => {
    switchTab(tabId);
  };
  
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Panel</CardTitle>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => undo()}
            disabled={state.undoStack.length === 0}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => redo()}
            disabled={state.redoStack.length === 0}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-hidden">
        <Tabs
          value={state.activeTabId || state.tabs[0]?.id}
          onValueChange={handleTabChange}
          className="h-full flex flex-col"
        >
          <div className="px-4 border-b overflow-x-auto">
            <TabsList className="h-10 w-full justify-start">
              {state.tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="px-3 py-1.5">
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {state.tabs.map((tab) => (
            <TabsContent
              key={tab.id}
              value={tab.id}
              className="flex-1 p-0 overflow-y-auto data-[state=active]:flex data-[state=active]:flex-col"
            >
              {tab.zones.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-muted-foreground p-4">
                  <p>No zones in this tab.</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-4 p-4">
                  {tab.zones.map((zone) => (
                    <PanelZoneComponent
                      key={zone.id}
                      tabId={tab.id}
                      zone={zone}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}