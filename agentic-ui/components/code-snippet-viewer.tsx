"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"

export interface CodeSnippetViewerProps {
  title: string
  description?: string
  language: string
  code: string
  showLineNumbers?: boolean
  className?: string
}

/**
 * CodeSnippetViewer - Renders syntax-highlighted code blocks
 *
 * Component for displaying formatted code snippets
 */
export function CodeSnippetViewer({
  title,
  description,
  language,
  code,
  showLineNumbers = true,
  className,
}: CodeSnippetViewerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Simple syntax highlighting for common languages
  const highlightCode = (code: string, language: string) => {
    // Split code into lines for line numbers
    const lines = code.split("\n")

    // Apply basic syntax highlighting based on language
    const highlightedLines = lines.map((line) => {
      let highlighted = line

      // Common syntax highlighting patterns
      if (language === "javascript" || language === "typescript" || language === "jsx" || language === "tsx") {
        // Keywords
        highlighted = highlighted.replace(
          /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this)\b/g,
          '<span class="text-purple-500">$1</span>',
        )
        // Strings
        highlighted = highlighted.replace(/(["'`])(.*?)\1/g, '<span class="text-green-500">$1$2$1</span>')
        // Comments
        highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="text-gray-500">$1</span>')
        // Numbers
        highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-amber-500">$1</span>')
      } else if (language === "html" || language === "xml") {
        // Tags
        highlighted = highlighted.replace(/(&lt;[^&]*&gt;)/g, '<span class="text-blue-500">$1</span>')
        // Attributes
        highlighted = highlighted.replace(/(\s[a-zA-Z-]+)=/g, '<span class="text-yellow-500">$1</span>=')
      } else if (language === "css") {
        // Selectors
        highlighted = highlighted.replace(/([.#][a-zA-Z-_]+\s*{)/g, '<span class="text-blue-500">$1</span>')
        // Properties
        highlighted = highlighted.replace(/(\s[a-zA-Z-]+):/g, '<span class="text-yellow-500">$1</span>:')
      }

      return highlighted
    })

    // Escape HTML characters
    const escapedCode = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

    return highlightedLines
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="text-sm font-mono bg-muted px-2 py-1 rounded">{language}</div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          <pre className="bg-muted rounded-md p-4 overflow-x-auto text-sm font-mono">
            {showLineNumbers ? (
              <table className="border-collapse w-full">
                <tbody>
                  {code.split("\n").map((line, i) => (
                    <tr key={i} className="leading-relaxed">
                      <td className="text-right pr-4 select-none text-muted-foreground w-[1%] whitespace-nowrap">
                        {i + 1}
                      </td>
                      <td>
                        <code>{line || " "}</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <code>{code}</code>
            )}
          </pre>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between py-2">
        <div className="text-xs text-muted-foreground">{code.split("\n").length} lines</div>
        <Button variant="ghost" size="sm" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy code
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
