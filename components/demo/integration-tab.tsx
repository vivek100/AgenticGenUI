"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Copy, FileDown, Loader2 } from "lucide-react"
import { generateIntegrationFile } from "@/services/integration-service"
import { cn } from "@/lib/utils"

export function IntegrationTab() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)

  const handleCopy = async () => {
    try {
      setIsLoading(true)
      const content = await generateIntegrationFile()
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Error copying content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    try {
      setIsLoading(true)
      const content = await generateIntegrationFile()
      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "llm.txt"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">How to Integrate AgenticGenUI</h1>
        <div className="flex gap-2">
          <Button onClick={handleCopy} variant="outline" className="flex items-center gap-2" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {isLoading ? "Generating..." : copied ? "Copied!" : "Copy Integration File"}
          </Button>
          <Button onClick={handleDownload} variant="default" className="flex items-center gap-2" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
            {isLoading ? "Generating..." : "Download llm.txt"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className={cn("prose max-w-none dark:prose-invert dark:text-slate-100")}>
                <h2 className="text-foreground dark:text-slate-50">AgenticGenUI Library</h2>
                <p className="text-foreground dark:text-slate-200">
                  AgenticGenUI is a comprehensive React component library designed for building AI-powered interfaces.
                  It provides a set of components that can be dynamically rendered based on LLM instructions, enabling
                  seamless integration between your AI backend and frontend.
                </p>
                <h3 className="text-foreground dark:text-slate-50">Key Features</h3>
                <ul className="dark:text-slate-200">
                  <li>40+ ready-to-use UI components optimized for AI interactions</li>
                  <li>Component registry system for dynamic rendering</li>
                  <li>Built-in event handling and communication with AI</li>
                  <li>Fully typed components with TypeScript</li>
                  <li>Built on top of shadcn/ui for consistent styling</li>
                  <li>Customizable theming and styling</li>
                  <li>Integration with CopilotKit and other AI frameworks</li>
                </ul>
                <p className="text-sm text-muted-foreground dark:text-slate-300 mt-4">
                  Note: The "Copy Integration File" and "Download llm.txt" buttons will generate a comprehensive file
                  containing all component code, documentation, and integration instructions. This may take a moment to
                  generate.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="installation" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className={cn("prose max-w-none dark:prose-invert dark:text-slate-100")}>
                <h2 className="text-foreground dark:text-slate-50">Installation</h2>
                <p className="text-foreground dark:text-slate-200">
                  Since AgenticGenUI is not available as an npm package yet, you'll need to clone the repository and
                  integrate it into your project:
                </p>
                <h3 className="text-foreground dark:text-slate-50">1. Clone the repository</h3>
                <pre className="bg-muted dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <code className="dark:text-slate-100">git clone https://github.com/vivek100/AgenticGenUI.git</code>
                </pre>
                <h3 className="text-foreground dark:text-slate-50">2. Copy the required files</h3>
                <p className="text-foreground dark:text-slate-200">Copy the following directories to your project:</p>
                <pre className="bg-muted dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <code className="dark:text-slate-100">{`
- agentic-ui/
- lib/utils.ts (if you don't already have it)
- components/ui/ (if you don't have shadcn/ui components)
  `}</code>
                </pre>
                <h3 className="text-foreground dark:text-slate-50">3. Install dependencies</h3>
                <pre className="bg-muted dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <code className="dark:text-slate-100">
                    npm install react-hook-form @hookform/resolvers zod tailwindcss-animate class-variance-authority
                    clsx tailwind-merge lucide-react
                  </code>
                </pre>
                <h3 className="text-foreground dark:text-slate-50">4. Configure tailwind.config.js</h3>
                <p className="text-foreground dark:text-slate-200">
                  Make sure your Tailwind configuration includes the necessary paths:
                </p>
                <pre className="bg-muted dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <code className="dark:text-slate-100">{`
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './agentic-ui/**/*.{js,ts,jsx,tsx}',
  ],
  // ...rest of your config
}
  `}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className={cn("prose max-w-none dark:prose-invert dark:text-slate-100")}>
                <h2 className="text-foreground dark:text-slate-50">Basic Usage</h2>
                <p className="text-foreground dark:text-slate-200">
                  To use AgenticGenUI in your application, you need to set up the component registry and create a
                  renderer.
                </p>
                <h3 className="text-foreground dark:text-slate-50">1. Register Components</h3>
                <pre className="bg-muted dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <code className="dark:text-slate-100">{`
// agentic-ui/registry.ts
import { registerComponent } from '@/agentic-ui';
import { MetricCard } from '@/agentic-ui/components/metric-card';
import { Chart } from '@/agentic-ui/components/chart';
// Import other components...

export function registerAllComponents() {
  registerComponent('metricCard', MetricCard);
  registerComponent('chart', Chart);
  // Register other components...
}
  `}</code>
                </pre>
                <h3 className="text-foreground dark:text-slate-50">2. Initialize in your application</h3>
                <pre className="bg-muted dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <code className="dark:text-slate-100">{`
// app/layout.tsx
import { useEffect } from 'react';
import { registerAllComponents } from '@/agentic-ui/registry';

export default function RootLayout({ children }) {
  useEffect(() => {
    registerAllComponents();
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
  `}</code>
                </pre>
                <h3 className="text-foreground dark:text-slate-50">3. Create a component renderer</h3>
                <pre className="bg-muted dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <code className="dark:text-slate-100">{`
// components/agent-renderer.tsx
'use client';

import { renderComponent } from '@/agentic-ui';

export function AgentRenderer({ componentData }) {
  return renderComponent(componentData.componentType, componentData.props);
}
  `}</code>
                </pre>
                <h3 className="text-foreground dark:text-slate-50">4. Use with CopilotKit</h3>
                <pre className="bg-muted dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <code className="dark:text-slate-100">{`
// app/chat/page.tsx
'use client';

import { CopilotKit, useCopilotChat } from "@copilot-kit/react-core";
import { CopilotTextarea } from "@copilot-kit/react-textarea";
import { AgentRenderer } from '@/components/agent-renderer';

export default function ChatPage() {
  const { messages, input, handleSubmit, handleInputChange } = useCopilotChat({
    id: "chat",
  });
  
  return (
    // Replace "YOUR_COPILOT_API_KEY" with your actual API key
    <CopilotKit apiKey="YOUR_COPILOT_API_KEY">
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-auto p-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.role === 'assistant' && message.ui ? (
                <AgentRenderer componentData={JSON.parse(message.ui)} />
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit}>
            <CopilotTextarea
              value={input}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Ask something..."
            />
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Send
            </button>
          </form>
        </div>
      </div>
    </CopilotKit>
  );
}
  `}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className={cn("prose max-w-none dark:prose-invert dark:text-slate-100")}>
                <h2 className="text-foreground dark:text-slate-50">Integration Examples</h2>

                <h3 className="text-foreground dark:text-slate-50">Example 1: Data Dashboard</h3>
                <p className="text-foreground dark:text-slate-200">
                  Here's how to instruct your LLM to render a dashboard with metrics and a chart:
                </p>
                <pre className="bg-muted dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <code className="dark:text-slate-100">{`
// LLM prompt
Show me a dashboard with key metrics and a sales chart for Q1 2023.

// LLM response format
{
  "componentType": "metricCardGrid",
  "props": {
    "title": "Q1 2023 Performance Dashboard",
    "metrics": [
      {
        "title": "Total Revenue",
        "value": "$1,234,567",
        "change": 12.3,
        "changeType": "increase",
        "icon": "dollar-sign"
      },
      {
        "title": "New Customers",
        "value": "846",
        "change": 5.7,
        "changeType": "increase",
        "icon": "users"
      },
      {
        "title": "Avg. Order Value",
        "value": "$1,458",
        "change": 2.4,
        "changeType": "decrease",
        "icon": "shopping-cart"
      },
      {
        "title": "Conversion Rate",
        "value": "3.2%",
        "change": 0.8,
        "changeType": "increase",
        "icon": "percent"
      }
    ]
  }
}

// Second component in the response
{
  "componentType": "chart",
  "props": {
    "title": "Q1 2023 Monthly Sales",
    "type": "bar",
    "data": {
      "labels": ["January", "February", "March"],
      "datasets": [
        {
          "label": "Revenue",
          "data": [420000, 380000, 434567],
          "backgroundColor": "rgba(59, 130, 246, 0.5)"
        },
        {
          "label": "Target",
          "data": [400000, 400000, 400000],
          "type": "line",
          "borderColor": "rgba(239, 68, 68, 1)",
          "backgroundColor": "transparent"
        }
      ]
    },
    "options": {
      "xAxisLabel": "Month",
      "yAxisLabel": "Revenue ($)"
    }
  }
}
  `}</code>
                </pre>

                <h3 className="text-foreground dark:text-slate-50">Example 2: User Management Interface</h3>
                <p className="text-foreground dark:text-slate-200">
                  Example of rendering a team member list with actions:
                </p>
                <pre className="bg-muted dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <code className="dark:text-slate-100">{`
// LLM prompt
Show me a list of team members with their roles and the ability to manage their permissions.

// LLM response format
{
  "componentType": "teamMemberList",
  "props": {
    "title": "Team Members",
    "members": [
      {
        "id": "1",
        "name": "Alex Johnson",
        "role": "Administrator",
        "email": "alex@example.com",
        "avatarUrl": "/abstract-letter-aj.png",
        "status": "active",
        "lastActive": "2023-05-15T10:30:00Z"
      },
      {
        "id": "2",
        "name": "Sarah Williams",
        "role": "Editor",
        "email": "sarah@example.com",
        "avatarUrl": "/stylized-sw.png",
        "status": "active",
        "lastActive": "2023-05-14T16:45:00Z"
      },
      {
        "id": "3",
        "name": "Michael Brown",
        "role": "Viewer",
        "email": "michael@example.com",
        "avatarUrl": "/monogram-mb.png",
        "status": "inactive",
        "lastActive": "2023-05-10T09:15:00Z"
      }
    ],
    "actions": [
      {
        "label": "Edit Permissions",
        "action": "editPermissions"
      },
      {
        "label": "Remove User",
        "action": "removeUser",
        "variant": "destructive"
      }
    ],
    "onAction": {
      "type": "function",
      "name": "handleTeamMemberAction"
    }
  }
}
  `}</code>
                </pre>

                <h3 className="text-foreground dark:text-slate-50">Example 3: Multi-step Workflow</h3>
                <p className="text-foreground dark:text-slate-200">Creating a multi-step form for user onboarding:</p>
                <pre className="bg-muted dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <code className="dark:text-slate-100">{`
// LLM prompt
Create a multi-step form for user registration with personal details, account preferences, and confirmation steps.

// LLM response format
{
  "componentType": "multiStepForm",
  "props": {
    "title": "Create Your Account",
    "description": "Complete the following steps to set up your account",
    "steps": [
      {
        "id": "personal",
        "title": "Personal Information",
        "description": "Tell us about yourself",
        "fields": [
          { "name": "fullName", "label": "Full Name", "type": "text", "required": true },
          { "name": "email", "label": "Email Address", "type": "email", "required": true },
          { "name": "phone", "label": "Phone Number", "type": "tel" }
        ]
      },
      {
        "id": "preferences",
        "title": "Account Preferences",
        "description": "Customize your experience",
        "fields": [
          { 
            "name": "theme", 
            "label": "Theme", 
            "type": "select", 
            "options": [
              { "value": "light", "label": "Light" },
              { "value": "dark", "label": "Dark" },
              { "value": "system", "label": "System Default" }
            ]
          },
          { "name": "notifications", "label": "Enable Notifications", "type": "checkbox" },
          { "name": "newsletter", "label": "Subscribe to Newsletter", "type": "checkbox" }
        ]
      },
      {
        "id": "confirmation",
        "title": "Confirmation",
        "description": "Review your information",
        "type": "summary"
      }
    ],
    "onComplete": {
      "type": "function",
      "name": "handleRegistrationComplete"
    }
  }
}
  `}</code>
                </pre>

                <h3 className="text-foreground dark:text-slate-50">Example 4: AI Prompt Builder</h3>
                <p className="text-foreground dark:text-slate-200">Creating an AI prompt builder interface:</p>
                <pre className="bg-muted dark:bg-slate-800 p-4 rounded-md overflow-x-auto">
                  <code className="dark:text-slate-100">{`
// LLM prompt
Create an interface for building AI prompts with templates and variables.

// LLM response format
{
  "componentType": "aiPromptBuilder",
  "props": {
    "title": "AI Prompt Builder",
    "description": "Create and customize prompts for your AI assistant",
    "templates": [
      {
        "id": "1",
        "name": "Product Description",
        "template": "Write a compelling description for {{productName}}, which is a {{productType}} that {{productBenefit}}."
      },
      {
        "id": "2",
        "name": "Email Response",
        "template": "Write a {{tone}} email response to {{name}} regarding {{topic}}."
      },
      {
        "id": "3",
        "name": "Custom",
        "template": ""
      }
    ],
    "variables": [
      { "name": "productName", "label": "Product Name", "type": "text" },
      { "name": "productType", "label": "Product Type", "type": "text" },
      { "name": "productBenefit", "label": "Product Benefit", "type": "text" },
      { "name": "name", "label": "Recipient Name", "type": "text" },
      { "name": "topic", "label": "Email Topic", "type": "text" },
      { 
        "name": "tone", 
        "label": "Email Tone", 
        "type": "select",
        "options": [
          { "value": "professional", "label": "Professional" },
          { "value": "friendly", "label": "Friendly" },
          { "value": "formal", "label": "Formal" }
        ]
      }
    ],
    "onGenerate": {
      "type": "function",
      "name": "handlePromptGeneration"
    }
  }
}
  `}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
