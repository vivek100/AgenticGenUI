"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { AlertCircle, Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export interface EnvironmentSwitcherProps {
  title: string
  description?: string
  environments: string[]
  current: string
  className?: string
}

/**
 * EnvironmentSwitcher - Switch between environments
 *
 * Component for switching between different environments (staging, production, etc.)
 */
export function EnvironmentSwitcher({
  title,
  description,
  environments = [],
  current = "",
  className,
}: EnvironmentSwitcherProps) {
  const { callTool } = useAgentActions()
  const [selectedEnvironment, setSelectedEnvironment] = useState(current)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [switching, setSwitching] = useState(false)

  const handleEnvironmentChange = (value: string) => {
    setSelectedEnvironment(value)

    // Show confirmation for production environment
    if (value === "production") {
      setShowConfirmation(true)
    } else {
      handleConfirmSwitch(value)
    }
  }

  const handleConfirmSwitch = (env: string = selectedEnvironment) => {
    setSwitching(true)

    // Simulate switching delay
    setTimeout(() => {
      callTool("switchEnvironment", { environment: env })
      setSwitching(false)
      setShowConfirmation(false)
    }, 1000)
  }

  const handleCancelSwitch = () => {
    setSelectedEnvironment(current)
    setShowConfirmation(false)
  }

  // Helper function to safely capitalize the first letter
  const capitalizeFirstLetter = (str: string) => {
    if (!str || typeof str !== "string") return ""
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {showConfirmation && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              You are about to switch to the production environment. This action may affect live systems. Are you sure
              you want to continue?
            </AlertDescription>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={handleCancelSwitch}>
                Cancel
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleConfirmSwitch()}>
                Yes, Switch to Production
              </Button>
            </div>
          </Alert>
        )}

        <div className="space-y-4">
          <RadioGroup
            value={selectedEnvironment}
            onValueChange={handleEnvironmentChange}
            className="flex flex-col gap-2"
            disabled={switching}
          >
            {environments.map((env) => (
              <div
                key={env}
                className={cn(
                  "flex items-center space-x-2 rounded-md border p-3",
                  selectedEnvironment === env && "border-primary bg-primary/5",
                )}
              >
                <RadioGroupItem value={env} id={`env-${env}`} />
                <Label htmlFor={`env-${env}`} className="flex flex-1 items-center justify-between cursor-pointer">
                  <div>
                    <span className="font-medium">{capitalizeFirstLetter(env)}</span>
                    <p className="text-sm text-muted-foreground">
                      {env === "development" && "For local development only"}
                      {env === "staging" && "For testing before production"}
                      {env === "production" && "Live environment - use with caution"}
                      {!["development", "staging", "production"].includes(env) && `${env} environment`}
                    </p>
                  </div>
                  {selectedEnvironment === env && current === env && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="pt-2 text-sm text-muted-foreground">
          Current environment: <span className="font-medium">{current}</span>
        </div>
      </CardContent>
    </Card>
  )
}
