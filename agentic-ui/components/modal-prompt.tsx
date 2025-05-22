"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { AlertCircle, HelpCircle, Info } from "lucide-react"

export interface ModalPromptProps {
  title: string
  description?: string
  modalTitle?: string
  modalDescription?: string
  modalType?: "alert" | "confirm" | "prompt"
  className?: string
}

/**
 * ModalPrompt - Centered modal for confirmations, alerts, inputs
 *
 * Component for displaying modal dialogs for user interaction
 */
export function ModalPrompt({
  title,
  description,
  modalTitle = "Confirmation Required",
  modalDescription = "Please confirm this action.",
  modalType = "confirm",
  className,
}: ModalPromptProps) {
  const { callTool } = useAgentActions()
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const handleOpenModal = () => {
    setOpen(true)
    setInputValue("")
  }

  const handleConfirm = () => {
    callTool("confirmModalPrompt", {
      confirmed: true,
      value: modalType === "prompt" ? inputValue : undefined,
    })
    setOpen(false)
  }

  const handleCancel = () => {
    callTool("confirmModalPrompt", {
      confirmed: false,
      value: undefined,
    })
    setOpen(false)
  }

  const getModalIcon = () => {
    switch (modalType) {
      case "alert":
        return <AlertCircle className="h-6 w-6 text-amber-500" />
      case "confirm":
        return <HelpCircle className="h-6 w-6 text-blue-500" />
      case "prompt":
        return <Info className="h-6 w-6 text-blue-500" />
    }
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Modal Type</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={modalType === "alert" ? "default" : "outline"}
                size="sm"
                onClick={() => callTool("setModalType", { type: "alert" })}
              >
                Alert
              </Button>
              <Button
                variant={modalType === "confirm" ? "default" : "outline"}
                size="sm"
                onClick={() => callTool("setModalType", { type: "confirm" })}
              >
                Confirm
              </Button>
              <Button
                variant={modalType === "prompt" ? "default" : "outline"}
                size="sm"
                onClick={() => callTool("setModalType", { type: "prompt" })}
              >
                Prompt
              </Button>
            </div>
          </div>

          <Button onClick={handleOpenModal}>Open Modal</Button>
        </div>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2">
              {getModalIcon()}
              <DialogTitle>{modalTitle}</DialogTitle>
            </div>
            <DialogDescription>{modalDescription}</DialogDescription>
          </DialogHeader>

          {modalType === "prompt" && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="prompt-input">Please enter a value:</Label>
                <Input id="prompt-input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} autoFocus />
              </div>
            </div>
          )}

          <DialogFooter>
            {modalType !== "alert" && (
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
            <Button onClick={handleConfirm}>
              {modalType === "alert" ? "OK" : modalType === "confirm" ? "Confirm" : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
