"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AgentRenderer } from "@/components/agent-renderer"
import { ModelSelector } from "@/components/model-selector"
import type { ModelKey } from "@/services/ai-service"

interface ChatTabProps {
  messages: any[]
  input: string
  setInput: (input: string) => void
  handleSendMessage: (e: React.FormEvent, modelKey: ModelKey) => void
  messagesEndRef: React.RefObject<HTMLDivElement>
}

export function ChatTab({ messages, input, setInput, handleSendMessage, messagesEndRef }: ChatTabProps) {
  const [selectedModel, setSelectedModel] = useState<ModelKey>("Grok-3-Mini")

  const handleSubmit = (e: React.FormEvent) => {
    handleSendMessage(e, selectedModel)
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((message, index) => {
            if (message.type === "user") {
              return (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <div className="rounded-full bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center">
                    U
                  </div>
                  <div className="bg-muted rounded-lg p-3 flex-1">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              )
            } else if (message.type === "assistant") {
              return (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <div className="rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center">A</div>
                  <div className="bg-blue-500/10 rounded-lg p-3 flex-1">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              )
            } else if (message.type === "component") {
              return (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <div className="rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center">A</div>
                  <div className="bg-blue-500/10 rounded-lg p-3 flex-1">
                    <AgentRenderer message={message.content || message} />
                  </div>
                </div>
              )
            } else if (message.type === "event") {
              return (
                <div key={index} className="flex items-start gap-3 text-sm">
                  <div className="rounded-full bg-yellow-500 text-white w-8 h-8 flex items-center justify-center">
                    E
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-3 flex-1">
                    <pre className="text-xs overflow-auto">{JSON.stringify(message.content, null, 2)}</pre>
                  </div>
                </div>
              )
            }
            return null
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-3xl mx-auto">
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            className="w-[180px] shrink-0"
          />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
