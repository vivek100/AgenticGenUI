"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PanelZone } from '@/types/panel';
import { PanelComponentRenderer } from './panel-component-renderer';

interface PanelZoneComponentProps {
  tabId: string;
  zone: PanelZone;
}

/**
 * PanelZoneComponent - Renders a zone (row) within a tab
 */
export function PanelZoneComponent({ tabId, zone }: PanelZoneComponentProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        {zone.components.length === 0 ? (
          <div className="text-center text-muted-foreground py-2">
            <p>Empty zone</p>
          </div>
        ) : (
          zone.components.map((component) => (
            <PanelComponentRenderer
              key={component.id}
              tabId={tabId}
              zoneId={zone.id}
              component={component}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}