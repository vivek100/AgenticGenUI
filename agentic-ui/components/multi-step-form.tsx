"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { CheckCircle2 } from "lucide-react"

export interface FormField {
  id: string
  label: string
  type: "text" | "email" | "number" | "textarea" | "select"
  placeholder?: string
  required?: boolean
  options?: string[] // For select fields
}

export interface Step {
  title: string
  description?: string
  fields: FormField[]
}

export interface MultiStepFormProps {
  title: string
  description?: string
  steps: Step[]
  submitLabel?: string
  cancelLabel?: string
  onCancel?: () => void
  className?: string
}

/**
 * MultiStepForm - Multi-step form with progress indicator
 *
 * Actionable component that triggers a tool call with form data
 */
export function MultiStepForm({
  title,
  description,
  steps,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  onCancel,
  className,
}: MultiStepFormProps) {
  const { callTool } = useAgentActions()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isComplete, setIsComplete] = useState(false)

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    callTool("submitMultiStepForm", { formData })
    setIsComplete(true)
  }

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields
    return currentFields.every((field) => !field.required || formData[field.id])
  }

  if (isComplete) {
    return (
      <Card className={cn("w-full", className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-medium mb-2">Form Submitted</h3>
          <p className="text-muted-foreground text-center">Thank you for your submission!</p>
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
      <CardContent>
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center",
                  index === currentStep
                    ? "text-primary"
                    : index < currentStep
                      ? "text-primary/70"
                      : "text-muted-foreground",
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2",
                    index === currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : index < currentStep
                        ? "border-primary/70 bg-primary/10 text-primary"
                        : "border-muted-foreground/30 text-muted-foreground",
                  )}
                >
                  {index + 1}
                </div>
                <span className="text-xs font-medium">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current step */}
        <div className="space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">{steps[currentStep].title}</h3>
            {steps[currentStep].description && (
              <p className="text-sm text-muted-foreground">{steps[currentStep].description}</p>
            )}
          </div>

          {steps[currentStep].fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              ) : field.type === "select" ? (
                <Select value={formData[field.id] || ""} onValueChange={(value) => handleChange(field.id, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder || "Select an option"} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              {cancelLabel}
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {currentStep > 0 && (
            <Button type="button" variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button type="button" onClick={handleNext} disabled={!isStepValid()}>
            {currentStep < steps.length - 1 ? "Next" : submitLabel}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
