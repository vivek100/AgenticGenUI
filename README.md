# AgenticGenUI

![AgenticGenUI Banner](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/modern-website-design-HR0VhK9fqIX295RHoOm5Y1Y836Cy7i.png)

AgenticGenUI is an open-source library for building AI-powered, generative user interfaces. It provides a comprehensive set of components designed specifically for AI agent applications, enabling developers to quickly create sophisticated, interactive interfaces that work seamlessly with large language models.

## 🌟 Features

- **40+ Specialized Components**: Purpose-built UI components for AI agent interfaces
- **CopilotKit Integration**: Seamless integration with CopilotKit for AI capabilities
- **Scenario-Based Design**: Components designed around common AI agent use cases
- **Fully Responsive**: Works across desktop, tablet, and mobile devices
- **Accessibility-First**: Built with a11y best practices in mind
- **TypeScript Support**: Full TypeScript definitions for all components
- **Customizable Theming**: Easily adapt to your brand's look and feel
- **Demo Application**: Explore components in an interactive demo

## 📋 Table of Contents

- [Installation](#installation)
- [Demo Setup](#demo-setup)
- [Component Overview](#component-overview)
- [Usage Examples](#usage-examples)
- [Integration Guide](#integration-guide)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Installation

Since AgenticGenUI is not yet available as an npm package, you'll need to clone the repository directly:

\`\`\`bash
# Clone the repository
git clone https://github.com/vivek100/AgenticGenUI.git

# Navigate to the project directory
cd AgenticGenUI

# Install dependencies
npm install

# Start the development server
npm run dev
\`\`\`

## 🖥️ Demo Setup

The repository includes a fully functional demo application that showcases all available components and their usage scenarios.

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
XAI_API_KEY=your_xai_api_key_here
\`\`\`

You can obtain an XAI API key from [Grok](https://grok.x.ai/).

### Running the Demo

\`\`\`bash
# Start the development server
npm run dev

# Open your browser and navigate to
# http://localhost:3000
\`\`\`

## 🧩 Component Overview

AgenticGenUI provides over 40 specialized components organized into the following categories:

### Data Visualization
- **MetricCard**: Display key metrics with visual indicators
- **Chart**: Visualize data with various chart types
- **DataTable**: Display and interact with tabular data
- **DataGrid**: Advanced data display with sorting and filtering
- **ExpandableRowTable**: Tables with expandable rows for detailed information

### Forms and Input
- **UserForm**: Customizable forms with validation
- **MultiStepForm**: Break complex forms into manageable steps
- **SearchWithFilters**: Advanced search functionality with filters
- **DateTimeRangePicker**: Select date and time ranges
- **MentionInput**: Text input with @mention capabilities
- **ColorPickerPopover**: Select colors with a popover interface

### Notifications and Feedback
- **InfoBanner**: Display important information to users
- **ProgressBar**: Show progress of operations
- **ToastStack**: Show stacked notifications
- **ConfirmationCard**: Get user confirmation for actions

### Project Management
- **KanbanBoard**: Drag-and-drop task management
- **ChecklistWithProgress**: Track completion of tasks
- **ApprovalWorkflowCard**: Manage approval processes
- **Timeline**: Visualize events over time

### Team and User Components
- **AvatarCard**: Display user information with avatars
- **TeamMemberList**: Show and manage team members
- **OrgChartViewer**: Visualize organizational hierarchies
- **ThreadedComments**: Nested comment threads

### E-commerce Components
- **ProductCatalogGrid**: Display products in a grid layout
- **CartSummaryPanel**: Show cart contents and totals
- **PaymentDetailsForm**: Collect payment information
- **OrderStatusTracker**: Track order status

### Content Display
- **TabLayout**: Organize content in tabs
- **AccordionContent**: Collapsible content sections
- **MarkdownRenderer**: Render Markdown content
- **CodeSnippetViewer**: Display formatted code snippets
- **ImageGallery**: Display collections of images

### Specialized Components
- **AIPromptBuilder**: Build and customize AI prompts
- **LocationMap**: Display locations on a map
- **RoutePlannerMap**: Plan and visualize routes
- **EnvironmentSwitcher**: Switch between environments
- **LanguageSelector**: Change application language
- **ThemeToggle**: Toggle between light and dark themes
- **ModalPrompt**: Display modal dialogs for user input

## 🔍 Usage Examples

### Basic Component Usage

\`\`\`tsx
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
\`\`\`

### Using with CopilotKit

\`\`\`tsx
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
\`\`\`

## 🔌 Integration Guide

AgenticGenUI is designed to work seamlessly with CopilotKit and other AI frameworks. Here's how to integrate it with your AI application:

### Setting Up CopilotKit

1. Install CopilotKit dependencies:

\`\`\`bash
npm install @copilotkit/react-core @copilotkit/react-ui @copilotkit/runtime
\`\`\`

2. Configure CopilotKit in your application:

\`\`\`tsx
// app/layout.tsx
import { CopilotKit } from '@copilotkit/react-core';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CopilotKit
          apiKey={process.env.COPILOT_API_KEY}
          chatApiEndpoint="/api/copilotkit"
        >
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}
\`\`\`

3. Create an API route for CopilotKit:

\`\`\`tsx
// app/api/copilotkit/route.ts
import { createAI, createStreamableUI } from '@copilotkit/runtime';

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;

  const ai = createAI({
    // Configure your AI settings here
  });

  // Process the messages and generate a response
  const response = await ai.chat(messages);

  return new Response(JSON.stringify(response));
}
\`\`\`

### Using AgenticGenUI Components with AI

1. Create a component that renders UI based on AI responses:

\`\`\`tsx
// components/agent-renderer.tsx
import { useChat } from '@copilotkit/react-core';
import { componentRegistry } from '../agentic-ui/registry';

export function AgentRenderer({ children }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  
  // Render AI-generated UI components based on messages
  const renderAIComponents = () => {
    return messages.map((message, index) => {
      if (message.role === 'assistant' && message.content) {
        try {
          const content = JSON.parse(message.content);
          if (content.type && componentRegistry[content.type]) {
            const Component = componentRegistry[content.type];
            return <Component key={index} {...content.props} />;
          }
        } catch (e) {
          return <div key={index}>{message.content}</div>;
        }
      }
      return null;
    });
  };

  return (
    <div>
      {children}
      {renderAIComponents()}
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask something..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
\`\`\`

2. Use the AgentRenderer in your application:

\`\`\`tsx
// app/page.tsx
import { AgentRenderer } from '../components/agent-renderer';

export default function Home() {
  return (
    <main>
      <h1>AgenticGenUI Demo</h1>
      <AgentRenderer>
        {/* Initial UI components */}
      </AgentRenderer>
    </main>
  );
}
\`\`\`

### Customizing AI Responses

To customize how the AI generates UI components, update the system prompt in your AI service:

\`\`\`tsx
// services/ai-service.ts
export function getSystemPrompt() {
  return `
    You are an AI assistant that generates UI components based on user requests.
    You have access to the following components:
    
    - MetricCard: Display key metrics with visual indicators
    - Chart: Visualize data with various chart types
    - DataTable: Display and interact with tabular data
    ...
    
    When a user asks for a UI component, respond with a JSON object that includes:
    - type: The component type
    - props: The component props
    
    Example:
    \`\`\`json
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
    \`\`\`
  `;
}
\`\`\`

## 🤝 Contributing

We welcome contributions to AgenticGenUI! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**:
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit your changes**:
   \`\`\`bash
   git commit -m 'Add some amazing feature'
   \`\`\`
4. **Push to the branch**:
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and naming conventions
- Write tests for new components
- Update documentation for any changes
- Ensure all tests pass before submitting a PR

## 📄 License

AgenticGenUI is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [CopilotKit](https://github.com/copilotkit/copilotkit) for the AI integration framework
- [shadcn/ui](https://ui.shadcn.com/) for the base component library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Next.js](https://nextjs.org/) for the framework
- All contributors who have helped shape this project

---

Built with ❤️ by [Vivek](https://github.com/vivek100)
