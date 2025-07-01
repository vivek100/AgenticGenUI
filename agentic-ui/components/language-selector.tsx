"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { Check, ChevronsUpDown, Globe, X } from "lucide-react"

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
 * Component for selecting multiple languages from a list
 */
export function LanguageSelector({ title, description, languages, current, className }: LanguageSelectorProps) {
  const { callTool } = useAgentActions()
  const [open, setOpen] = useState(false)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([current])

  const handleSelect = (code: string) => {
    setSelectedLanguages((prev) => {
      // If already selected, remove it
      if (prev.includes(code)) {
        return prev.filter((c) => c !== code)
      }
      // Otherwise add it
      return [...prev, code]
    })
    
    callTool("changeLanguage", { languageCode: code })
  }

  const handleRemove = (code: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedLanguages((prev) => prev.filter((c) => c !== code))
    
    // If we're removing the current language, select the first remaining one
    if (selectedLanguages.length > 1) {
      const newCurrent = selectedLanguages.filter(c => c !== code)[0]
      callTool("changeLanguage", { languageCode: newCurrent })
    }
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
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>
                  {selectedLanguages.length > 0
                    ? `${selectedLanguages.length} language${selectedLanguages.length > 1 ? 's' : ''} selected`
                    : "Select languages..."}
                </span>
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
                    <CommandItem key={language.code} value={language.code} onSelect={() => handleSelect(language.code)}>
                      <div className="flex items-center gap-2">
                        {language.flag && <span>{language.flag}</span>}
                        <span>{language.name}</span>
                      </div>
                      <Check 
                        className={cn(
                          "ml-auto h-4 w-4", 
                          selectedLanguages.includes(language.code) ? "opacity-100" : "opacity-0"
                        )} 
                      />
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
              variant={selectedLanguages.includes(language.code) ? "default" : "outline"}
              size="sm"
              onClick={() => handleSelect(language.code)}
              className="flex items-center gap-1 pr-2"
            >
              {language.flag && <span>{language.flag}</span>}
              <span>{language.name}</span>
              {selectedLanguages.includes(language.code) && (
                <X 
                  className="ml-1 h-3 w-3 cursor-pointer" 
                  onClick={(e) => handleRemove(language.code, e)}
                />
              )}
            </Button>
          ))}
        </div>

        <div className="pt-2 text-sm text-muted-foreground">
          Selected languages: 
          <span className="font-medium">
            {selectedLanguages.length > 0 
              ? languages
                  .filter(lang => selectedLanguages.includes(lang.code))
                  .map(lang => lang.name)
                  .join(", ")
              : "None"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
