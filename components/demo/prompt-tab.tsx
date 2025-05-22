"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Copy, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { getSystemPrompt } from "@/services/ai-service"
import { ScrollArea } from "@/components/ui/scroll-area"

export function PromptTab() {
  const [copied, setCopied] = useState(false)
  const [promptTab, setPromptTab] = useState("current")
  const [systemPrompt, setSystemPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [componentNames, setComponentNames] = useState<string[]>([])

  const fetchSystemPrompt = async () => {
    setIsLoading(true)
    try {
      const prompt = getSystemPrompt()
      setSystemPrompt(prompt)

      // Extract component names from the system prompt
      const match = prompt.match(/following components: (.*?)\./)
      if (match && match[1]) {
        const components = match[1].split(", ").map((name) => name.trim())
        setComponentNames(components)
      }
    } catch (error) {
      console.error("Error fetching system prompt:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSystemPrompt()
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(systemPrompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Error copying content:", error)
    }
  }

  const handleRefresh = () => {
    fetchSystemPrompt()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">System Prompt</h1>
          <div className="flex gap-2">
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              disabled={isLoading}
            >
              <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              Refresh
            </Button>
            <Button onClick={handleCopy} variant="outline" size="sm" className="flex items-center gap-2">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        <Tabs value={promptTab} onValueChange={setPromptTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="current">Current Prompt</TabsTrigger>
            <TabsTrigger value="components">Available Components</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex-1 overflow-hidden">
        {promptTab === "current" && (
          <ScrollArea className="h-full">
            <div className="p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto whitespace-pre-wrap text-sm">
                      {systemPrompt}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        )}

        {promptTab === "components" && (
          <ScrollArea className="h-full">
            <div className="p-4">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Available Components ({componentNames.length})</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {componentNames.map((component, index) => (
                      <div key={index} className="bg-muted p-3 rounded-md">
                        <p className="font-medium">{component}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
