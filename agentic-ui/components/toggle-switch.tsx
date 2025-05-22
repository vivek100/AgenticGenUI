"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"

export interface ToggleSwitchProps {
  title: string
  description?: string
  defaultChecked?: boolean
  settingId: string
  className?: string
}

/**
 * ToggleSwitch - On/Off toggle with agent or tool trigger
 *
 * Actionable component that triggers a tool call when toggled
 */
export function ToggleSwitch({ title, description, defaultChecked = false, settingId, className }: ToggleSwitchProps) {
  const { callTool } = useAgentActions()
  const [checked, setChecked] = useState(defaultChecked)

  const handleToggle = (checked: boolean) => {
    setChecked(checked)
    callTool("toggleSetting", {
      settingId,
      enabled: checked,
    })
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Switch id={`toggle-${settingId}`} checked={checked} onCheckedChange={handleToggle} />
          <Label htmlFor={`toggle-${settingId}`}>{checked ? "Enabled" : "Disabled"}</Label>
        </div>
      </CardContent>
    </Card>
  )
}
