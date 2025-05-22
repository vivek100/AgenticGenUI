"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { Check, ChevronsUpDown, Globe } from "lucide-react"

export interface Language {
  code: string
  name: string
  flag?: string
}

export interface LanguageSelectorProps {
  title: string
  description?: string
  languages: Language[]
  current: string
  className?: string
}

/**
 * LanguageSelector - Dropdown language selection
 *
 * Component for selecting a language from a list
 */
export function LanguageSelector({ title, description, languages, current, className }: LanguageSelectorProps) {
  const { callTool } = useAgentActions()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(current)

  const currentLanguage = languages.find((lang) => lang.code === value)

  const handleSelect = (code: string) => {
    setValue(code)
    setOpen(false)
    callTool("changeLanguage", { languageCode: code })
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
              <div className="flex items-center gap-2">
                {currentLanguage?.flag && <span>{currentLanguage.flag}</span>}
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>{currentLanguage?.name || "Select language..."}</span>
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search language..." />
              <CommandList>
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup className="max-h-[300px] overflow-auto">
                  {languages.map((language) => (
                    <CommandItem key={language.code} value={language.code} onSelect={handleSelect}>
                      <div className="flex items-center gap-2">
                        {language.flag && <span>{language.flag}</span>}
                        <span>{language.name}</span>
                      </div>
                      <Check className={cn("ml-auto h-4 w-4", value === language.code ? "opacity-100" : "opacity-0")} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex flex-wrap gap-2">
          {languages.slice(0, 5).map((language) => (
            <Button
              key={language.code}
              variant={value === language.code ? "default" : "outline"}
              size="sm"
              onClick={() => handleSelect(language.code)}
              className="flex items-center gap-1"
            >
              {language.flag && <span>{language.flag}</span>}
              <span>{language.name}</span>
            </Button>
          ))}
        </div>

        <div className="pt-2 text-sm text-muted-foreground">
          Current language: <span className="font-medium">{currentLanguage?.name || current}</span>
        </div>
      </CardContent>
    </Card>
  )
}
