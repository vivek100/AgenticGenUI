"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { AtSign, Send } from "lucide-react"

export interface SuggestedUser {
  id: string
  name: string
  avatar?: string
}

export interface MentionInputProps {
  title: string
  description?: string
  suggestedUsers?: SuggestedUser[]
  placeholder?: string
  className?: string
}

/**
 * MentionInput - Text input with @mention suggestions
 *
 * Interactive component for mentioning users in messages
 */
export function MentionInput({
  title,
  description,
  suggestedUsers = [],
  placeholder = "Type your message...",
  className,
}: MentionInputProps) {
  const { callTool } = useAgentActions()
  const [message, setMessage] = useState("")
  const [mentionQuery, setMentionQuery] = useState("")
  const [showMentions, setShowMentions] = useState(false)
  const [mentionPosition, setMentionPosition] = useState(0)
  const [cursorPosition, setCursorPosition] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Filter users based on mention query
  const filteredUsers = suggestedUsers.filter((user) => user.name.toLowerCase().includes(mentionQuery.toLowerCase()))

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setMessage(value)

    // Get cursor position
    const cursorPos = e.target.selectionStart || 0
    setCursorPosition(cursorPos)

    // Check if we're in a mention context
    const textBeforeCursor = value.substring(0, cursorPos)
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/)

    if (mentionMatch) {
      setMentionQuery(mentionMatch[1])
      setMentionPosition(mentionMatch.index!)
      setShowMentions(true)
    } else {
      setShowMentions(false)
    }
  }

  // Handle selecting a user mention
  const handleSelectUser = (user: SuggestedUser) => {
    // Replace the @query with the selected user
    const beforeMention = message.substring(0, mentionPosition)
    const afterMention = message.substring(cursorPosition)
    const newMessage = `${beforeMention}@${user.name} ${afterMention}`

    setMessage(newMessage)
    setShowMentions(false)

    // Focus back on the input
    if (inputRef.current) {
      inputRef.current.focus()
      // Set cursor position after the inserted mention
      const newCursorPos = mentionPosition + user.name.length + 2 // +2 for @ and space
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = newCursorPos
          inputRef.current.selectionEnd = newCursorPos
        }
      }, 0)
    }
  }

  // Handle submitting the message
  const handleSubmit = () => {
    if (!message.trim()) return

    // Find all mentions in the message
    const mentions = []
    const mentionRegex = /@(\w+)/g
    let match

    while ((match = mentionRegex.exec(message)) !== null) {
      const mentionedName = match[1]
      const user = suggestedUsers.find((u) => u.name === mentionedName)
      if (user) {
        mentions.push(user)
      }
    }

    callTool("submitMentionMessage", {
      message,
      mentions: mentions.map((user) => ({ id: user.id, name: user.name })),
    })

    setMessage("")
  }

  // Close mentions popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showMentions && triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setShowMentions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showMentions])

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />

          {/* Mention trigger for popover */}
          <div className="absolute bottom-2 left-2">
            <Popover open={showMentions} onOpenChange={setShowMentions}>
              <PopoverTrigger asChild>
                <button ref={triggerRef} type="button" className="hidden">
                  Mention
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                {filteredUsers.length > 0 ? (
                  <div className="max-h-[200px] overflow-auto py-1">
                    {filteredUsers.map((user) => (
                      <button
                        key={user.id}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
                        onClick={() => handleSelectUser(user)}
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-3 py-2 text-sm text-muted-foreground">No users found</div>
                )}
              </PopoverContent>
            </Popover>
          </div>

          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">Type @ to mention someone</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => setMessage(message + "@")}>
          <AtSign className="mr-2 h-4 w-4" />
          Mention
        </Button>
        <Button onClick={handleSubmit} disabled={!message.trim()}>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </Button>
      </CardFooter>
    </Card>
  )
}
