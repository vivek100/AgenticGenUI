export const markdownRendererScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "markdownrenderer",
    props: {
      title: "Documentation",
      description: "Project overview and setup instructions",
      content: `
# Project Overview

This is a **Next.js** application with TypeScript and Tailwind CSS.

## Features

- Server-side rendering
- API routes
- Component library
- Authentication

## Getting Started

1. Clone the repository
2. Install dependencies with \`npm install\`
3. Run the development server with \`npm run dev\`

\`\`\`javascript
// Example code snippet
function greeting(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

![Project Structure](/placeholder.svg?height=200&width=400&query=code%20editor%20example)

> Note: Make sure you have Node.js v16+ installed on your machine.
      `,
    },
  },
}
