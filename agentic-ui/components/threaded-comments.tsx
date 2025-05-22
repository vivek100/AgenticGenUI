"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { MessageSquare, MoreHorizontal, Reply, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface Comment {
  id: string
  author: {
    name: string
    avatar?: string
  }
  content: string
  timestamp: string
  replies?: Comment[]
}

export interface ThreadedCommentsProps {
  title: string
  description?: string
  comments: Comment[]
  currentUser?: {
    name: string
    avatar?: string
  }
  className?: string
}

/**
 * ThreadedComments - Nested threaded comments
 *
 * Interactive component for displaying and managing threaded comments
 */
export function ThreadedComments({
  title,
  description,
  comments: initialComments,
  currentUser = { name: "Current User" },
  className,
}: ThreadedCommentsProps) {
  const { callTool } = useAgentActions()
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<{ commentId: string; parentId?: string } | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handlePostComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: currentUser,
      content: newComment,
      timestamp: new Date().toISOString(),
      replies: [],
    }

    const updatedComments = [...comments, comment]
    setComments(updatedComments)
    setNewComment("")

    callTool("postComment", {
      comment,
      parentId: null,
    })
  }

  const handleReply = (commentId: string, parentId?: string) => {
    setReplyingTo({ commentId, parentId })
    setReplyContent("")
  }

  const handlePostReply = () => {
    if (!replyingTo || !replyContent.trim()) return

    const reply: Comment = {
      id: `comment-${Date.now()}`,
      author: currentUser,
      content: replyContent,
      timestamp: new Date().toISOString(),
      replies: [],
    }

    // Find the comment to reply to
    const updatedComments = [...comments]

    // Helper function to add reply to the correct comment
    const addReplyToComment = (comments: Comment[], commentId: string, reply: Comment): boolean => {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].id === commentId) {
          if (!comments[i].replies) {
            comments[i].replies = []
          }
          comments[i].replies.push(reply)
          return true
        }

        if (comments[i].replies && addReplyToComment(comments[i].replies, commentId, reply)) {
          return true
        }
      }
      return false
    }

    // Add the reply to the correct comment
    addReplyToComment(updatedComments, replyingTo.commentId, reply)

    setComments(updatedComments)
    setReplyingTo(null)
    setReplyContent("")

    callTool("postComment", {
      comment: reply,
      parentId: replyingTo.commentId,
    })
  }

  const handleDeleteComment = (commentId: string, parentId?: string) => {
    // Helper function to remove a comment
    const removeComment = (comments: Comment[], commentId: string): Comment[] => {
      return comments.filter((comment) => {
        if (comment.id === commentId) {
          return false
        }

        if (comment.replies) {
          comment.replies = removeComment(comment.replies, commentId)
        }

        return true
      })
    }

    const updatedComments = removeComment([...comments], commentId)
    setComments(updatedComments)

    callTool("deleteComment", {
      commentId,
      parentId,
    })
  }

  // Recursive component to render comments and their replies
  const CommentItem = ({ comment, parentId }: { comment: Comment; parentId?: string }) => (
    <div className="space-y-2">
      <div className="flex gap-3 items-start">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{comment.author.name}</span>
              <span className="text-xs text-muted-foreground ml-2">{new Date(comment.timestamp).toLocaleString()}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleReply(comment.id, parentId)}>
                  <Reply className="mr-2 h-4 w-4" />
                  Reply
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteComment(comment.id, parentId)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="text-sm">{comment.content}</div>
          <div className="pt-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground"
              onClick={() => handleReply(comment.id, parentId)}
            >
              <Reply className="mr-1 h-3 w-3" />
              Reply
            </Button>
          </div>
        </div>
      </div>

      {/* Reply form */}
      {replyingTo?.commentId === comment.id && (
        <div className="ml-10 mt-2 space-y-2">
          <Textarea
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handlePostReply}>
              Post Reply
            </Button>
          </div>
        </div>
      )}

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-10 space-y-4 border-l-2 border-muted pl-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} parentId={comment.id} />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment list */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="mx-auto h-8 w-8 opacity-50 mb-2" />
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
          )}
        </div>

        {/* New comment form */}
        <div className="space-y-2 pt-4 border-t">
          <h3 className="text-sm font-medium">Add a comment</h3>
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button onClick={handlePostComment} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
