"use client"

// This service generates the integration file content at runtime

import { componentDescriptions } from "@/data/component-descriptions"
import { getAllComponentNames, getComponentCode, getAllCoreFileNames, getCoreFileCode } from "./component-code-registry"

// Generate markdown documentation
const generateDocumentation = (): string => {
  return `# Agentic UI Integration Guide

## Overview

Agentic UI is a comprehensive React component library designed for building AI-powered interfaces. It provides a set of components that can be dynamically rendered based on LLM instructions, enabling seamless integration between your AI backend and frontend.

### Key Features

- 40+ ready-to-use UI components optimized for AI interactions
- Component registry system for dynamic rendering
- Built-in event handling and communication with AI
- Fully typed components with TypeScript
- Built on top of shadcn/ui for consistent styling
- Customizable theming and styling

## Installation

To install the Agentic UI library in your Next.js project, follow these steps:

### 1. Install dependencies

\`\`\`bash
npm install agentic-ui react-hook-form @hookform/resolvers zod
\`\`\`

### 2. Set up your project

Make sure your project has the following structure:

\`\`\`
project-root/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── lib/
│   └── utils.ts
└── agentic-ui/
    ├── components/
    ├── hooks/
    ├── registry.ts
    └── index.ts
\`\`\`

### 3. Configure tailwind.config.js

Make sure your Tailwind configuration includes the necessary paths:

\`\`\`js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './agentic-ui/**/*.{js,ts,jsx,tsx}',
  ],
  // ...rest of your config
}
\`\`\`

## Basic Usage

To use Agentic UI in your application, you need to set up the component registry and create a renderer.

### 1. Register Components

\`\`\`typescript
// agentic-ui/registry.ts
import { registerComponent } from 'agentic-ui';
import { MetricCard } from './components/metric-card';
import { Chart } from './components/chart';
// Import other components...

export function registerAllAgentComponents() {
  registerComponent('metricCard', MetricCard);
  registerComponent('chart', Chart);
  // Register other components...
}
\`\`\`

### 2. Initialize in your application

\`\`\`typescript
// app/layout.tsx
import { useEffect } from 'react';
import { registerAllAgentComponents } from '@/agentic-ui/registry';

export default function RootLayout({ children }) {
  useEffect(() => {
    registerAllAgentComponents();
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
\`\`\`

### 3. Create a component renderer

\`\`\`typescript
// components/agent-renderer.tsx
import { renderAgentComponent } from 'agentic-ui';

export function AgentRenderer({ componentData }) {
  return renderAgentComponent(componentData.componentType, componentData.props);
}
\`\`\`

### 4. Use in your AI chat interface

\`\`\`typescript
// app/chat/page.tsx
import { AgentRenderer } from '@/components/agent-renderer';

export default function ChatPage() {
  // Your chat logic here...
  
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          {message.type === 'text' ? (
            <p>{message.content}</p>
          ) : message.type === 'component' ? (
            <AgentRenderer componentData={message.content} />
          ) : null}
        </div>
      ))}
    </div>
  );
}
\`\`\`

## Integration Examples

### Example 1: Basic Chart Component

Here's how to instruct your LLM to render a chart component:

\`\`\`
// LLM prompt
I need to display a bar chart showing monthly sales data for 2023.

// LLM response format
{
  "type": "component",
  "componentType": "chart",
  "props": {
    "type": "bar",
    "data": {
      "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      "datasets": [
        {
          "label": "Sales 2023",
          "data": [65, 59, 80, 81, 56, 55],
          "backgroundColor": "rgba(75, 192, 192, 0.2)"
        }
      ]
    },
    "options": {
      "title": "Monthly Sales 2023",
      "xAxisLabel": "Month",
      "yAxisLabel": "Sales ($)"
    }
  }
}
\`\`\`

### Example 2: Data Table with Filtering

Example of rendering a data table with filtering capabilities:

\`\`\`
// LLM prompt
Show me a table of customer data with the ability to filter by status.

// LLM response format
{
  "type": "component",
  "componentType": "dataTable",
  "props": {
    "data": [
      { "id": 1, "name": "John Doe", "email": "john@example.com", "status": "active" },
      { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "status": "inactive" },
      // More data...
    ],
    "columns": [
      { "accessorKey": "id", "header": "ID" },
      { "accessorKey": "name", "header": "Name" },
      { "accessorKey": "email", "header": "Email" },
      { "accessorKey": "status", "header": "Status" }
    ],
    "filterableColumns": ["status"],
    "searchable": true,
    "pagination": true
  }
}
\`\`\`

### Example 3: Multi-step Form

Creating a multi-step form for user onboarding:

\`\`\`
// LLM prompt
Create a multi-step form for user registration with personal details, account preferences, and confirmation steps.

// LLM response format
{
  "type": "component",
  "componentType": "multiStepForm",
  "props": {
    "steps": [
      {
        "id": "personal",
        "title": "Personal Information",
        "fields": [
          { "name": "fullName", "label": "Full Name", "type": "text", "required": true },
          { "name": "email", "label": "Email Address", "type": "email", "required": true }
        ]
      },
      {
        "id": "preferences",
        "title": "Account Preferences",
        "fields": [
          { "name": "theme", "label": "Theme", "type": "select", "options": ["light", "dark", "system"] },
          { "name": "notifications", "label": "Enable Notifications", "type": "checkbox" }
        ]
      },
      {
        "id": "confirmation",
        "title": "Confirmation",
        "type": "summary"
      }
    ],
    "onComplete": {
      "action": "submitForm",
      "endpoint": "/api/register"
    }
  }
}
\`\`\`

## Available Components

The following components are available in the Agentic UI library:
`
}

// Main function to generate the integration file
export const generateIntegrationFile = async (): Promise<string> => {
  // Get all component names
  const componentNames = getAllComponentNames()
  const coreFileNames = getAllCoreFileNames()

  // Generate documentation
  let content = generateDocumentation()

  // Add component descriptions
  content += "\n\n## Component Descriptions\n\n"

  for (const name of componentNames) {
    // Convert kebab-case to camelCase for looking up in componentDescriptions
    const camelCaseName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    const description = componentDescriptions[camelCaseName as keyof typeof componentDescriptions]
    if (description) {
      content += `### ${camelCaseName}\n\n${description.description}\n\n`
    }
  }

  // Add core files code
  content += "\n\n## Core Files\n\n"

  for (const name of coreFileNames) {
    const code = getCoreFileCode(name)
    content += `### ${name}.ts\n\n\`\`\`typescript\n${code}\n\`\`\`\n\n`
  }

  // Add component code
  content += "\n\n## Component Code\n\n"

  for (const name of componentNames) {
    const code = getComponentCode(name)
    content += `### ${name}.tsx\n\n\`\`\`typescript\n${code}\n\`\`\`\n\n`
  }

  return content
}
