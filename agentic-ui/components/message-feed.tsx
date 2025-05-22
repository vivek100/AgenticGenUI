import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

export interface Message {
  id: string
  sender: {
    name: string
    avatar?: string
  }
  content: string
  timestamp: string | Date
  isCurrentUser?: boolean
}

export interface MessageFeedProps {
  title: string
  description?: string
  messages: Message[]
  className?: string
}

/**
 * MessageFeed - Displays a read-only chat history
 *
 * Display-only component for showing message history
 */
export function MessageFeed({ title, description, messages, className }: MessageFeedProps) {
  // Format timestamp
  const formatTimestamp = (timestamp: string | Date) => {
    const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp
    return format(date, "h:mm a")
  }

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex gap-3", message.isCurrentUser && "flex-row-reverse")}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
              <AvatarFallback>{getInitials(message.sender.name)}</AvatarFallback>
            </Avatar>

            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.isCurrentUser
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted rounded-bl-none",
              )}
            >
              <div className="flex justify-between items-start gap-2">
                <span className="font-medium text-xs">{message.isCurrentUser ? "You" : message.sender.name}</span>
                <span className="text-xs opacity-70">{formatTimestamp(message.timestamp)}</span>
              </div>
              <div className="mt-1 whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}

        {messages.length === 0 && <div className="text-center py-8 text-muted-foreground">No messages yet</div>}
      </CardContent>
    </Card>
  )
}
