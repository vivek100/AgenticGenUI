"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { Moon, Sun } from "lucide-react"

export interface ThemeToggleProps {
  title: string
  description?: string
  defaultTheme?: "light" | "dark" | "system"
  className?: string
}

/**
 * ThemeToggle - Switch light/dark mode
 *
 * Component for toggling between light and dark themes
 */
export function ThemeToggle({ title, description, defaultTheme = "system", className }: ThemeToggleProps) {
  const { callTool } = useAgentActions()
  const [theme, setTheme] = useState<"light" | "dark" | "system">(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before accessing window
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)

    // Update document class for immediate visual feedback
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      // System preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      if (systemPrefersDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }

    callTool("toggleTheme", { theme: newTheme })
  }

  const handleToggleDarkMode = (checked: boolean) => {
    handleThemeChange(checked ? "dark" : "light")
  }

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Switch id="dark-mode" checked={theme === "dark"} onCheckedChange={handleToggleDarkMode} />
          <Label htmlFor="dark-mode" className="flex items-center gap-2">
            {theme === "dark" ? (
              <>
                <Moon className="h-4 w-4" />
                Dark Mode
              </>
            ) : (
              <>
                <Sun className="h-4 w-4" />
                Light Mode
              </>
            )}
          </Label>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            className="flex flex-col items-center justify-center gap-2 p-4 h-auto"
            onClick={() => handleThemeChange("light")}
          >
            <Sun className="h-6 w-6" />
            <span>Light</span>
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "outline"}
            className="flex flex-col items-center justify-center gap-2 p-4 h-auto"
            onClick={() => handleThemeChange("dark")}
          >
            <Moon className="h-6 w-6" />
            <span>Dark</span>
          </Button>
          <Button
            variant={theme === "system" ? "default" : "outline"}
            className="flex flex-col items-center justify-center gap-2 p-4 h-auto"
            onClick={() => handleThemeChange("system")}
          >
            <div className="flex">
              <Sun className="h-6 w-6" />
              <Moon className="h-6 w-6" />
            </div>
            <span>System</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
