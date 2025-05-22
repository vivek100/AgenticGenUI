"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface MarkdownRendererProps {
  title: string
  description?: string
  content: string
  className?: string
}

/**
 * MarkdownRenderer - Renders markdown content
 *
 * Component for displaying formatted markdown content
 */
export function MarkdownRenderer({ title, description, content = "", className }: MarkdownRendererProps) {
  const [html, setHtml] = useState<string>("")

  useEffect(() => {
    // Simple markdown parser
    const parseMarkdown = (markdown = "") => {
      if (!markdown) return ""

      let html = markdown

      // Headers
      html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-5 mb-3">$1</h2>')
      html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')

      // Bold and italic
      html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>")

      // Links
      html = html.replace(/\[([^\]]+)\]$$([^)]+)$$/gim, '<a href="$2" class="text-primary hover:underline">$1</a>')

      // Lists
      html = html.replace(/^\s*\n\* (.*)/gim, '<ul class="list-disc pl-5 my-3"><li>$1</li></ul>')
      html = html.replace(/^\s*\n\d\. (.*)/gim, '<ol class="list-decimal pl-5 my-3"><li>$1</li></ol>')

      // Fix lists (combine adjacent list items)
      html = html.replace(/<\/ul>\s*<ul class="list-disc pl-5 my-3">/gim, "")
      html = html.replace(/<\/ol>\s*<ol class="list-decimal pl-5 my-3">/gim, "")

      // Code blocks
      html = html.replace(
        /```([\s\S]*?)```/gim,
        '<pre class="bg-muted p-3 rounded-md overflow-x-auto my-3"><code>$1</code></pre>',
      )

      // Inline code
      html = html.replace(/`([^`]+)`/gim, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')

      // Blockquotes
      html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-muted pl-4 italic my-3">$1</blockquote>')

      // Paragraphs
      html = html.replace(/^\s*(\n)?(.+)/gim, (match) =>
        /<(\/)?(h1|h2|h3|h4|h5|h6|blockquote|pre|ul|ol|li)/.test(match) ? match : '<p class="my-2">' + match + "</p>",
      )

      // Remove empty paragraphs
      html = html.replace(/<p class="my-2"><\/p>/gim, "")

      // Horizontal rule
      html = html.replace(/^---(\s*)?$/gim, '<hr class="my-4 border-t border-border" />')

      return html
    }

    setHtml(parseMarkdown(content))
  }, [content])

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />
      </CardContent>
    </Card>
  )
}
