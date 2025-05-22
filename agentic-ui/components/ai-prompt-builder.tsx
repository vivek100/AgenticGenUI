"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Trash2, ChevronDown, ChevronUp, Copy, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export interface PromptVariable {
  id: string
  name: string
  value: string
  description?: string
}

export interface PromptExample {
  id: string
  input: string
  output: string
}

export interface PromptTemplate {
  id: string
  name: string
  content: string
  description?: string
}

export interface AIPromptBuilderProps {
  initialPrompt?: string
  variables?: PromptVariable[]
  examples?: PromptExample[]
  templates?: PromptTemplate[]
  models?: string[]
  onPromptChange?: (prompt: string) => void
  onSubmit?: (data: {
    prompt: string
    model: string
    temperature: number
    maxTokens: number
    variables: PromptVariable[]
    examples: PromptExample[]
  }) => void
}

export function AIPromptBuilder({
  initialPrompt = "",
  variables = [],
  examples = [],
  templates = [
    {
      id: "1",
      name: "Basic Question",
      content: "Answer the following question:\n\n{{question}}",
      description: "Simple prompt for asking a direct question",
    },
    {
      id: "2",
      name: "Content Creation",
      content:
        "Create a {{contentType}} about {{topic}} with the following characteristics:\n- Tone: {{tone}}\n- Length: {{length}}\n- Target audience: {{audience}}",
      description: "Template for generating various types of content",
    },
    {
      id: "3",
      name: "Expert Persona",
      content: "You are an expert in {{expertise}}. {{request}}",
      description: "Prompt the AI to respond as a subject matter expert",
    },
    {
      id: "4",
      name: "Step-by-Step Guide",
      content:
        "Provide a detailed step-by-step guide on how to {{task}}. Include:\n1. Required materials/prerequisites\n2. Detailed steps with explanations\n3. Common mistakes to avoid\n4. Tips for success",
      description: "Get comprehensive instructions for a specific task",
    },
  ],
  models = ["gpt-4o", "gpt-4-turbo", "claude-3-opus", "claude-3-sonnet", "gemini-pro", "llama-3"],
  onPromptChange,
  onSubmit,
}: AIPromptBuilderProps) {
  const [prompt, setPrompt] = useState(initialPrompt)
  const [promptVariables, setPromptVariables] = useState<PromptVariable[]>(variables)
  const [promptExamples, setPromptExamples] = useState<PromptExample[]>(examples)
  const [selectedModel, setSelectedModel] = useState(models[0] || "")
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1000)
  const [useExamples, setUseExamples] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")
  const [expandedSections, setExpandedSections] = useState<string[]>(["parameters"])

  // Process the prompt by replacing variables
  const processedPrompt = () => {
    let result = prompt

    promptVariables.forEach((variable) => {
      const pattern = new RegExp(`\\{\\{${variable.name}\\}\\}`, "g")
      result = result.replace(pattern, variable.value || `[${variable.name}]`)
    })

    return result
  }

  // Generate the final prompt including examples if enabled
  const finalPrompt = () => {
    let result = processedPrompt()

    if (useExamples && promptExamples.length > 0) {
      result += "\n\nExamples:\n"
      promptExamples.forEach((example) => {
        result += `\nInput: ${example.input}\nOutput: ${example.output}\n`
      })
    }

    return result
  }

  // Handle prompt change
  useEffect(() => {
    if (onPromptChange) {
      onPromptChange(finalPrompt())
    }
  }, [prompt, promptVariables, promptExamples, useExamples])

  // Add a new variable
  const addVariable = () => {
    const id = `var-${Date.now()}`
    setPromptVariables([...promptVariables, { id, name: "", value: "" }])
  }

  // Update a variable
  const updateVariable = (id: string, field: keyof PromptVariable, value: string) => {
    setPromptVariables(promptVariables.map((v) => (v.id === id ? { ...v, [field]: value } : v)))
  }

  // Remove a variable
  const removeVariable = (id: string) => {
    setPromptVariables(promptVariables.filter((v) => v.id !== id))
  }

  // Add a new example
  const addExample = () => {
    const id = `ex-${Date.now()}`
    setPromptExamples([...promptExamples, { id, input: "", output: "" }])
  }

  // Update an example
  const updateExample = (id: string, field: keyof PromptExample, value: string) => {
    setPromptExamples(promptExamples.map((e) => (e.id === id ? { ...e, [field]: value } : e)))
  }

  // Remove an example
  const removeExample = (id: string) => {
    setPromptExamples(promptExamples.filter((e) => e.id !== id))
  }

  // Apply a template
  const applyTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      setPrompt(template.content)

      // Extract variables from template
      const variablePattern = /\{\{([^}]+)\}\}/g
      const matches = template.content.matchAll(variablePattern)
      const extractedVars = new Set<string>()

      for (const match of matches) {
        extractedVars.add(match[1])
      }

      // Create variables for any new ones found in the template
      const newVars: PromptVariable[] = [...promptVariables]

      extractedVars.forEach((varName) => {
        if (!promptVariables.some((v) => v.name === varName)) {
          newVars.push({
            id: `var-${Date.now()}-${varName}`,
            name: varName,
            value: "",
          })
        }
      })

      setPromptVariables(newVars)
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({
        prompt: finalPrompt(),
        model: selectedModel,
        temperature,
        maxTokens,
        variables: promptVariables,
        examples: promptExamples,
      })
    }
  }

  // Copy prompt to clipboard
  const copyPrompt = () => {
    navigator.clipboard.writeText(finalPrompt())
  }

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Prompt Builder</span>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardTitle>
        <CardDescription>
          Create effective prompts for AI models with variables, examples, and templates
        </CardDescription>
      </CardHeader>

      <CardContent>
        <TabsContent value="editor" className="mt-0 space-y-4">
          {/* Prompt Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="prompt">Prompt</Label>
              <div className="flex items-center space-x-2">
                <Select onValueChange={applyTemplate}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Templates" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="min-h-[200px] font-mono"
            />
          </div>

          {/* Variables Section */}
          <div className="border rounded-lg overflow-hidden">
            <div
              className="flex items-center justify-between p-3 bg-muted cursor-pointer"
              onClick={() => toggleSection("variables")}
            >
              <h3 className="font-medium">Variables</h3>
              {expandedSections.includes("variables") ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {expandedSections.includes("variables") && (
              <div className="p-3 space-y-3">
                {promptVariables.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No variables defined. Add variables to make your prompt dynamic.
                  </div>
                ) : (
                  promptVariables.map((variable) => (
                    <div key={variable.id} className="grid grid-cols-12 gap-2 items-start">
                      <div className="col-span-5">
                        <Input
                          value={variable.name}
                          onChange={(e) => updateVariable(variable.id, "name", e.target.value)}
                          placeholder="Variable name"
                          className="w-full"
                        />
                      </div>
                      <div className="col-span-6">
                        <Input
                          value={variable.value}
                          onChange={(e) => updateVariable(variable.id, "value", e.target.value)}
                          placeholder="Value"
                          className="w-full"
                        />
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeVariable(variable.id)}
                          className="h-9 w-9"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
                <Button variant="outline" size="sm" onClick={addVariable} className="w-full">
                  <PlusCircle size={16} className="mr-2" />
                  Add Variable
                </Button>
              </div>
            )}
          </div>

          {/* Examples Section */}
          <div className="border rounded-lg overflow-hidden">
            <div
              className="flex items-center justify-between p-3 bg-muted cursor-pointer"
              onClick={() => toggleSection("examples")}
            >
              <div className="flex items-center space-x-2">
                <h3 className="font-medium">Examples</h3>
                <Switch checked={useExamples} onCheckedChange={setUseExamples} onClick={(e) => e.stopPropagation()} />
              </div>
              {expandedSections.includes("examples") ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {expandedSections.includes("examples") && (
              <div className="p-3 space-y-3">
                {promptExamples.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No examples defined. Examples help the AI understand the expected format.
                  </div>
                ) : (
                  promptExamples.map((example) => (
                    <div key={example.id} className="space-y-2 border p-3 rounded-md">
                      <div className="flex justify-between items-center">
                        <Label>Example {promptExamples.findIndex((e) => e.id === example.id) + 1}</Label>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExample(example.id)}
                          className="h-8 w-8"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`input-${example.id}`}>Input</Label>
                        <Textarea
                          id={`input-${example.id}`}
                          value={example.input}
                          onChange={(e) => updateExample(example.id, "input", e.target.value)}
                          placeholder="Example input"
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`output-${example.id}`}>Output</Label>
                        <Textarea
                          id={`output-${example.id}`}
                          value={example.output}
                          onChange={(e) => updateExample(example.id, "output", e.target.value)}
                          placeholder="Expected output"
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  ))
                )}
                <Button variant="outline" size="sm" onClick={addExample} className="w-full">
                  <PlusCircle size={16} className="mr-2" />
                  Add Example
                </Button>
              </div>
            )}
          </div>

          {/* Parameters Section */}
          <div className="border rounded-lg overflow-hidden">
            <div
              className="flex items-center justify-between p-3 bg-muted cursor-pointer"
              onClick={() => toggleSection("parameters")}
            >
              <h3 className="font-medium">Model Parameters</h3>
              {expandedSections.includes("parameters") ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {expandedSections.includes("parameters") && (
              <div className="p-3 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger id="model">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="temperature">Temperature: {temperature.toFixed(1)}</Label>
                  </div>
                  <Slider
                    id="temperature"
                    min={0}
                    max={1}
                    step={0.1}
                    value={[temperature]}
                    onValueChange={(values) => setTemperature(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Precise (0.0)</span>
                    <span>Creative (1.0)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="max-tokens">Max Tokens: {maxTokens}</Label>
                  </div>
                  <Slider
                    id="max-tokens"
                    min={100}
                    max={4000}
                    step={100}
                    value={[maxTokens]}
                    onValueChange={(values) => setMaxTokens(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Short (100)</span>
                    <span>Long (4000)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-0">
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-muted/50">
              <h3 className="font-medium mb-2">Processed Prompt</h3>
              <div className="whitespace-pre-wrap font-mono text-sm bg-background p-3 rounded border">
                {finalPrompt()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Variables</h3>
                {promptVariables.length > 0 ? (
                  <div className="space-y-2">
                    {promptVariables.map((variable) => (
                      <div key={variable.id} className="flex items-center space-x-2">
                        <Badge variant="outline" className="font-mono">
                          {`{{${variable.name}}}`}
                        </Badge>
                        <span className="text-sm">→</span>
                        <span className="text-sm font-medium">{variable.value || `[${variable.name}]`}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No variables defined</p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Model Settings</h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Model:</span>
                    <span className="font-medium">{selectedModel}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Temperature:</span>
                    <span className="font-medium">{temperature.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Max Tokens:</span>
                    <span className="font-medium">{maxTokens}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Examples:</span>
                    <span className="font-medium">{useExamples ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={copyPrompt}>
          <Copy size={16} className="mr-2" />
          Copy Prompt
        </Button>
        <Button onClick={handleSubmit}>
          <Wand2 size={16} className="mr-2" />
          Generate with AI
        </Button>
      </CardFooter>
    </Card>
  )
}
