"use client"

import React from 'react';
import { ChatWithPanel } from '@/components/panel/chat-with-panel';

/**
 * PanelDemoPage - Demo page for the AI-controlled panel with tabs and zones
 */
export default function PanelDemoPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="border-b p-4">
        <h1 className="text-2xl font-bold">AI-Controlled Panel with Tabs and Zones Demo</h1>
        <p className="text-muted-foreground">
          Try asking the AI to create tabs, zones, and components in the panel.
        </p>
      </header>
      
      <main className="flex-1 p-4 overflow-hidden">
        <ChatWithPanel />
      </main>
      
      <footer className="border-t p-4 text-center text-sm text-muted-foreground">
        <p>
          Try commands like: "Create a tab named Dashboard" or "Add a component to the panel"
        </p>
      </footer>
    </div>
  );
}