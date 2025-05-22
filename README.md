# AgenticGenUI

![AgenticGenUI Banner](https://github.com/user-attachments/assets/48f6e5c3-b903-4f23-b76f-2d735c48fc80)

**AgenticGenUI** is an open-source library for building AI-powered, generative user interfaces. It provides a comprehensive set of components tailored for AI agent applications, enabling developers to rapidly create interactive, production-ready UIs that seamlessly integrate with large language models.

## LIVE DEMO : https://v0-open-source-library-creation.vercel.app/

---

## 🌟 Features

* **40+ Specialized Components**: Purpose-built UI components for AI agent interfaces
* **CopilotKit Integration**: Seamless compatibility with CopilotKit
* **Scenario-Based Design**: Tailored to real AI agent use cases
* **Fully Responsive**: Desktop, tablet, and mobile support
* **Accessibility-First**: Adheres to a11y best practices
* **TypeScript Support**: Strong typings for all components
* **Customizable Theming**: Easy branding and theming
* **Demo Application**: Explore all components live

---

## 📋 Table of Contents

* [Installation](#-installation)
* [Demo Setup](#-demo-setup)
* [Component Overview](#-component-overview)
* [Usage Examples](#-usage-examples)
* [Integration Guide](#-integration-guide)
* [Contributing](#-contributing)
* [License](#-license)
* [Acknowledgements](#-acknowledgements)

---

## 🚀 Installation

> **Note:** AgenticGenUI is not yet available via npm. Use Git to install directly.

```bash
# Clone the repository
git clone https://github.com/vivek100/AgenticGenUI.git

# Navigate into the project
cd AgenticGenUI

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🖥️ Demo Setup

Explore the full functionality via the included demo app.

### Prerequisites

* Node.js 18.x+
* npm 9.x+

### Environment Variables

Create a `.env.local` file in the root:

```env
XAI_API_KEY=your_xai_api_key_here
```
Note: You can run the demo app without api keys too, it has mock mode where it can use fuzzy match of input text message and render the components.

> Get your API key from [Grok](https://grok.x.ai/)

### Run the Demo

```bash
npm run dev
# Visit http://localhost:3000
```

---

## 🧩 Component Overview

AgenticGenUI ships 40+ ready-to-use components:

### 📊 Data Visualization

* `MetricCard`, `Chart`, `DataTable`, `DataGrid`, `ExpandableRowTable`

### 📝 Forms and Inputs

* `UserForm`, `MultiStepForm`, `SearchWithFilters`, `DateTimeRangePicker`
* `MentionInput`, `ColorPickerPopover`

### 🔔 Notifications

* `InfoBanner`, `ProgressBar`, `ToastStack`, `ConfirmationCard`

### ✅ Project Management

* `KanbanBoard`, `ChecklistWithProgress`, `ApprovalWorkflowCard`, `Timeline`

### 👥 Team & Users

* `AvatarCard`, `TeamMemberList`, `OrgChartViewer`, `ThreadedComments`

### 🛒 E-Commerce

* `ProductCatalogGrid`, `CartSummaryPanel`, `PaymentDetailsForm`, `OrderStatusTracker`

### 📚 Content Display

* `TabLayout`, `AccordionContent`, `MarkdownRenderer`, `CodeSnippetViewer`, `ImageGallery`

### 🤖 Specialized Components

* `AIPromptBuilder`, `LocationMap`, `RoutePlannerMap`, `EnvironmentSwitcher`
* `LanguageSelector`, `ThemeToggle`, `ModalPrompt`

---

## 🔍 Usage Examples

### ✅ Basic Component Example

```tsx
import { MetricCard } from './agentic-ui/components';

function Dashboard() {
  return (
    <MetricCard
      title="Active Users"
      value={1254}
      change={12.5}
      changeType="increase"
      description="Total active users in the last 30 days"
      icon="users"
    />
  );
}
```

### 🧠 With CopilotKit Integration

```tsx
import { CopilotKit } from '@copilotkit/react-core';
import { AgentRenderer } from './components/agent-renderer';
import { MetricCardGrid } from './agentic-ui/components';

function App() {
  return (
    <CopilotKit apiKey="your-api-key">
      <AgentRenderer>
        <MetricCardGrid
          title="Business Overview"
          metrics={[
            {
              title: "Revenue",
              value: "$12,345",
              change: 8.2,
              changeType: "increase",
              description: "Total revenue this month",
              icon: "dollar-sign"
            },
            {
              title: "Users",
              value: "1,234",
              change: 12.5,
              changeType: "increase",
              description: "Active users this month",
              icon: "users"
            }
          ]}
        />
      </AgentRenderer>
    </CopilotKit>
  );
}
```

---

## 🔌 Integration Guide

### 1. Install CopilotKit

```bash
npm install @copilotkit/react-core @copilotkit/react-ui @copilotkit/runtime
```

### 2. Configure Layout

```tsx
// app/layout.tsx
import { CopilotKit } from '@copilotkit/react-core';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CopilotKit apiKey={process.env.COPILOT_API_KEY} chatApiEndpoint="/api/copilotkit">
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}
```

### 3. Create API Endpoint

```tsx
// app/api/copilotkit/route.ts
import { createAI } from '@copilotkit/runtime';

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;

  const ai = createAI({ /* your AI config */ });

  const response = await ai.chat(messages);
  return new Response(JSON.stringify(response));
}
```

---

## 🧠 AgentRenderer Example

```tsx
// components/agent-renderer.tsx
import { useChat } from '@copilotkit/react-core';
import { componentRegistry } from '../agentic-ui/registry';

export function AgentRenderer({ children }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const renderAIComponents = () =>
    messages.map((message, i) => {
      if (message.role === 'assistant' && message.content) {
        try {
          const content = JSON.parse(message.content);
          const Component = componentRegistry[content.type];
          return Component ? <Component key={i} {...content.props} /> : null;
        } catch {
          return <div key={i}>{message.content}</div>;
        }
      }
      return null;
    });

  return (
    <div>
      {children}
      {renderAIComponents()}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} placeholder="Ask something..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

---

## 🧠 System Prompt Customization

```tsx
export function getSystemPrompt() {
  return `
    You are an AI that generates UI components from user requests.
    Available components include:
    
    - MetricCard
    - Chart
    - DataTable
    ...

    Respond using JSON with:
    - type: Component name
    - props: Component props

    Example:
    {
      "type": "MetricCard",
      "props": {
        "title": "Active Users",
        "value": 1254,
        "change": 12.5,
        "changeType": "increase",
        "description": "Total active users in the last 30 days",
        "icon": "users"
      }
    }
  `;
}
```

---

## 🤝 Contributing

We welcome contributions!

1. **Fork** this repo
2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**

   ```bash
   git commit -m "Add new feature"
   ```
4. **Push your branch**

   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request**

### Contribution Tips

* Follow the existing code style
* Write tests for new components
* Update documentation
* Ensure tests pass

---

## 📄 License

AgenticGenUI is licensed under the **MIT License**. See [LICENSE](LICENSE) for full details.

---

## 🙏 Acknowledgements

* [CopilotKit](https://github.com/copilotkit/copilotkit) – AI integration
* [shadcn/ui](https://ui.shadcn.com/) – Component library
* [Tailwind CSS](https://tailwindcss.com/) – Styling framework
* [Next.js](https://nextjs.org/) – Fullstack framework
* And all the future contributors ❤️

---

Built with ❤️ by [Vivek](https://github.com/vivek100)

---
