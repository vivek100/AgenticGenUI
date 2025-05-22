"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { CheckCircle, XCircle } from "lucide-react"

export interface ApprovalWorkflowCardProps {
  title: string
  description?: string
  message: string
  approveLabel?: string
  rejectLabel?: string
  requireComment?: boolean
  className?: string
}

/**
 * ApprovalWorkflowCard - Approve/Reject workflow step
 *
 * Actionable component that triggers workflow approval or rejection
 */
export function ApprovalWorkflowCard({
  title,
  description,
  message,
  approveLabel = "Approve",
  rejectLabel = "Reject",
  requireComment = false,
  className,
}: ApprovalWorkflowCardProps) {
  const { callTool } = useAgentActions()
  const [comment, setComment] = useState("")
  const [showComment, setShowComment] = useState(false)
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">("pending")

  const handleApprove = () => {
    callTool("approveWorkflowStep", {
      approved: true,
      comment: comment.trim() || undefined,
    })
    setStatus("approved")
  }

  const handleReject = () => {
    if (requireComment && !comment.trim()) {
      setShowComment(true)
      return
    }

    callTool("approveWorkflowStep", {
      approved: false,
      comment: comment.trim() || undefined,
    })
    setStatus("rejected")
  }

  if (status !== "pending") {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-6">
          {status === "approved" ? (
            <>
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">Approved</h3>
            </>
          ) : (
            <>
              <XCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-medium mb-2">Rejected</h3>
            </>
          )}
          {comment && <p className="text-muted-foreground text-center mt-2">"{comment}"</p>}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-md">
          <p>{message}</p>
        </div>

        {(showComment || requireComment) && (
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Comment {requireComment && <span className="text-red-500">*</span>}
            </label>
            <Textarea
              id="comment"
              placeholder="Add your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setShowComment(!showComment)}>
          {showComment ? "Hide Comment" : "Add Comment"}
        </Button>
        <div className="flex gap-2">
          <Button variant="destructive" onClick={handleReject}>
            {rejectLabel}
          </Button>
          <Button variant="default" onClick={handleApprove} disabled={requireComment && !comment.trim()}>
            {approveLabel}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
