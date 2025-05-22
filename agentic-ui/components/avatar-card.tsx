import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface AvatarCardProps {
  name: string
  role?: string
  imageUrl?: string
  description?: string
  status?: "online" | "offline" | "away" | "busy"
  badges?: string[]
  className?: string
}

/**
 * AvatarCard - Displays user profile picture + info
 *
 * Display-only component for showing user or agent profiles
 */
export function AvatarCard({ name, role, imageUrl, description, status, badges = [], className }: AvatarCardProps) {
  // Generate initials from name
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-amber-500",
    busy: "bg-red-500",
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="relative">
          <Avatar className="h-12 w-12">
            <AvatarImage src={imageUrl || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {status && (
            <span
              className={cn(
                "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
                statusColors[status],
              )}
            />
          )}
        </div>
        <div>
          <CardTitle className="text-base">{name}</CardTitle>
          {role && <CardDescription>{role}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {badges.map((badge, index) => (
              <Badge key={index} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
