"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MODELS, type ModelKey, DEFAULT_MODEL } from "@/services/ai-service"

interface ModelSelectorProps {
  selectedModel: ModelKey
  onModelChange: (model: ModelKey) => void
  className?: string
}

export function ModelSelector({ selectedModel, onModelChange, className }: ModelSelectorProps) {
  const [open, setOpen] = useState(false)
  const [validModel, setValidModel] = useState<ModelKey>(DEFAULT_MODEL)

  // Ensure the selected model exists in MODELS, otherwise use the default model
  useEffect(() => {
    if (!MODELS[selectedModel]) {
      setValidModel(DEFAULT_MODEL)
      onModelChange(DEFAULT_MODEL)
    } else {
      setValidModel(selectedModel)
    }
  }, [selectedModel, onModelChange])

  // If there's only one model, just display it without dropdown functionality
  if (Object.keys(MODELS).length === 1) {
    const model = MODELS[Object.keys(MODELS)[0] as ModelKey]
    return (
      <div className={cn("flex items-center gap-2 px-3 py-2 border rounded-md", className)}>
        <span className="text-sm font-medium">{model.name}</span>
        <span className="text-xs text-muted-foreground">{model.description}</span>
      </div>
    )
  }

  // Otherwise, show the dropdown selector
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={cn("justify-between", className)}>
          {MODELS[validModel]?.name || "Select Model"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search model..." />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {Object.entries(MODELS).map(([key, model]) => (
                <CommandItem
                  key={key}
                  value={key}
                  onSelect={() => {
                    onModelChange(key as ModelKey)
                    setValidModel(key as ModelKey)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", validModel === key ? "opacity-100" : "opacity-0")} />
                  <div className="flex flex-col">
                    <span>{model.name}</span>
                    <span className="text-xs text-muted-foreground">{model.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
