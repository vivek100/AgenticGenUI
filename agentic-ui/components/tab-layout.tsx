"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
}

export interface TabLayoutProps {
  title: string
  description?: string
  tabs: TabItem[]
  defaultTab?: string
  className?: string
}

/**
 * TabLayout - Tabbed content layout
 *
 * Component for organizing content in tabs
 */
export function TabLayout({ title, description, tabs, defaultTab, className }: TabLayoutProps) {
  const { callTool } = useAgentActions()
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id || "")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    callTool("changeTab", { tabId: value })
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-4 h-auto">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="py-2 data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <div className="flex items-center gap-2">
                  {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
                  {tab.label}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="p-4">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
