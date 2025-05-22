"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"

export interface TeamMember {
  id: string
  name: string
  role: string
  imageUrl?: string
  status?: "online" | "offline" | "away" | "busy"
  skills?: string[]
}

export interface TeamMemberListProps {
  title: string
  description?: string
  members: TeamMember[]
  className?: string
}

/**
 * TeamMemberList - Displays a team with roles
 *
 * Actionable component that triggers selection of team members
 */
export function TeamMemberList({ title, description, members, className }: TeamMemberListProps) {
  const { callTool } = useAgentActions()
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  const handleSelectMember = (member: TeamMember) => {
    setSelectedMember(member.id)
    callTool("selectTeamMember", { memberId: member.id })
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

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-amber-500",
    busy: "bg-red-500",
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {members.map((member) => (
            <li
              key={member.id}
              onClick={() => handleSelectMember(member)}
              className={cn(
                "flex items-center p-3 rounded-md cursor-pointer transition-colors",
                selectedMember === member.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted",
              )}
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.imageUrl || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                </Avatar>
                {member.status && (
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white",
                      statusColors[member.status],
                    )}
                  />
                )}
              </div>

              <div className="ml-3 flex-1">
                <div className="font-medium">{member.name}</div>
                <div className="text-sm text-muted-foreground">{member.role}</div>
              </div>

              {member.skills && member.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 ml-2">
                  {member.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
