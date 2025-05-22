"use client"

export const aiPromptBuilderDescription = {
  name: "AI Prompt Builder",
  description: "A component for creating and refining prompts for AI models with variables, examples, and templates.",
  props: [
    {
      name: "initialPrompt",
      type: "string",
      description: "The starting prompt text",
      required: false,
    },
    {
      name: "variables",
      type: "array",
      description: "Array of variables to use in the prompt",
      required: false,
    },
    {
      name: "examples",
      type: "array",
      description: "Example inputs and outputs to guide the AI",
      required: false,
    },
    {
      name: "templates",
      type: "array",
      description: "Predefined prompt templates to choose from",
      required: false,
    },
    {
      name: "models",
      type: "array",
      description: "Available AI models to select from",
      required: false,
    },
    {
      name: "onPromptChange",
      type: "function",
      description: "Callback when the prompt changes",
      required: false,
    },
    {
      name: "onSubmit",
      type: "function",
      description: "Callback when the prompt is submitted",
      required: false,
    },
  ],
  examples: [
    {
      description: "Basic prompt builder",
      code: `<AIPromptBuilder 
  initialPrompt="Write a blog post about {{topic}}" 
  variables={[{ id: "1", name: "topic", value: "artificial intelligence" }]} 
/>`,
    },
    {
      description: "With examples and templates",
      code: `<AIPromptBuilder 
  initialPrompt="Create a {{contentType}} about {{topic}}" 
  variables={[
    { id: "1", name: "contentType", value: "blog post" },
    { id: "2", name: "topic", value: "machine learning" }
  ]}
  examples={[
    { id: "1", input: "...", output: "..." }
  ]}
  onSubmit={(data) => console.log(data)}
/>`,
    },
  ],
}
