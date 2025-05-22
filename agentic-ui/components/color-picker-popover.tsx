"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { Check, Pipette } from "lucide-react"

export interface ColorPickerPopoverProps {
  title: string
  description?: string
  value?: string
  presetColors?: string[]
  className?: string
}

/**
 * ColorPickerPopover - Color selection with popover
 *
 * Interactive component for selecting colors
 */
export function ColorPickerPopover({
  title,
  description,
  value = "#6366f1",
  presetColors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#6366f1",
    "#a855f7",
    "#ec4899",
    "#000000",
    "#ffffff",
  ],
  className,
}: ColorPickerPopoverProps) {
  const { callTool } = useAgentActions()
  const [color, setColor] = useState(value)
  const [hexInput, setHexInput] = useState(value)
  const [open, setOpen] = useState(false)

  // Update hex input when color changes
  useEffect(() => {
    setHexInput(color)
  }, [color])

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    setColor(newColor)
  }

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setHexInput(value)

    // Only update color if it's a valid hex
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setColor(value)
    }
  }

  const handleSelectPreset = (presetColor: string) => {
    setColor(presetColor)
  }

  const handleSelectColor = () => {
    callTool("selectColor", { color })
    setOpen(false)
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: color }} />
            <div className="flex-1">
              <p className="font-medium">{color}</p>
              <p className="text-xs text-muted-foreground">Current selection</p>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Pipette className="mr-2 h-4 w-4" />
                  Pick Color
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <div className="h-24 w-full rounded-md border" style={{ backgroundColor: color }} />
                    <div className="flex gap-2">
                      <div className="flex-1 space-y-1">
                        <Label htmlFor="color-picker">Color</Label>
                        <Input
                          id="color-picker"
                          type="color"
                          value={color}
                          onChange={handleColorChange}
                          className="h-10"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Label htmlFor="hex-input">Hex</Label>
                        <Input id="hex-input" value={hexInput} onChange={handleHexInputChange} className="h-10" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Presets</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {presetColors.map((presetColor) => (
                        <button
                          key={presetColor}
                          className={cn(
                            "h-8 w-8 rounded-md border flex items-center justify-center",
                            color === presetColor && "ring-2 ring-primary",
                          )}
                          style={{ backgroundColor: presetColor }}
                          onClick={() => handleSelectPreset(presetColor)}
                        >
                          {color === presetColor && (
                            <Check className={cn("h-4 w-4", presetColor === "#ffffff" ? "text-black" : "text-white")} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleSelectColor}>Select Color</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">Click "Pick Color" to change the color</div>
      </CardFooter>
    </Card>
  )
}
