"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface OrgNode {
  id: string
  name: string
  role: string
  parentId?: string
  avatar?: string
}

export interface OrgChartViewerProps {
  title: string
  description?: string
  nodes: OrgNode[]
  className?: string
}

/**
 * OrgChartViewer - Visual org chart tree view
 *
 * Component for displaying organizational hierarchies
 */
export function OrgChartViewer({ title, description, nodes = [], className }: OrgChartViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Build tree structure from flat nodes
  const buildTree = (nodes: OrgNode[]) => {
    if (!nodes || nodes.length === 0) return []

    const nodeMap = new Map<string, OrgNode & { children: OrgNode[] }>()

    // Create nodes with empty children arrays
    nodes.forEach((node) => {
      nodeMap.set(node.id, { ...node, children: [] })
    })

    // Build tree by adding children to their parents
    const rootNodes: (OrgNode & { children: OrgNode[] })[] = []

    nodes.forEach((node) => {
      if (node.parentId && nodeMap.has(node.parentId)) {
        const parent = nodeMap.get(node.parentId)!
        parent.children.push(nodeMap.get(node.id)!)
      } else {
        // No parent or parent not found, this is a root node
        rootNodes.push(nodeMap.get(node.id)!)
      }
    })

    return rootNodes
  }

  // Render org chart
  useEffect(() => {
    if (!canvasRef.current || !nodes || nodes.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Build tree
    const rootNodes = buildTree(nodes)
    if (rootNodes.length === 0) return

    // Node dimensions
    const nodeWidth = 160
    const nodeHeight = 80
    const horizontalSpacing = 40
    const verticalSpacing = 60

    // Calculate tree dimensions
    const getTreeDimensions = (
      node: OrgNode & { children: OrgNode[] },
      level = 0,
      positions: Map<string, { x: number; y: number; width: number }>,
    ) => {
      if (node.children.length === 0) {
        positions.set(node.id, { x: 0, y: level * (nodeHeight + verticalSpacing), width: nodeWidth })
        return { width: nodeWidth, height: nodeHeight }
      }

      let totalWidth = 0
      let maxHeight = 0

      // Process all children
      node.children.forEach((child) => {
        const { width, height } = getTreeDimensions(child as OrgNode & { children: OrgNode[] }, level + 1, positions)
        totalWidth += width + horizontalSpacing
        maxHeight = Math.max(maxHeight, height)
      })

      // Adjust for spacing
      totalWidth -= horizontalSpacing

      // Update positions map with this node's position
      positions.set(node.id, {
        x: totalWidth / 2 - nodeWidth / 2,
        y: level * (nodeHeight + verticalSpacing),
        width: totalWidth,
      })

      return { width: Math.max(totalWidth, nodeWidth), height: maxHeight + nodeHeight + verticalSpacing }
    }

    // Draw the tree
    const drawTree = (
      node: OrgNode & { children: OrgNode[] },
      x: number,
      y: number,
      positions: Map<string, { x: number; y: number; width: number }>,
    ) => {
      // Draw node
      drawNode(node, x, y)

      if (node.children.length === 0) return

      // Draw children
      let childX = x - positions.get(node.id)!.width / 2 + nodeWidth / 2

      node.children.forEach((child) => {
        const childPos = positions.get(child.id)!
        const nextX = childX + childPos.width / 2

        // Draw line to child
        ctx.beginPath()
        ctx.moveTo(x + nodeWidth / 2, y + nodeHeight)
        ctx.lineTo(x + nodeWidth / 2, y + nodeHeight + verticalSpacing / 2)
        ctx.lineTo(nextX, y + nodeHeight + verticalSpacing / 2)
        ctx.lineTo(nextX, y + nodeHeight + verticalSpacing)
        ctx.strokeStyle = "#d1d5db"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw child subtree
        drawTree(
          child as OrgNode & { children: OrgNode[] },
          nextX - nodeWidth / 2,
          y + nodeHeight + verticalSpacing,
          positions,
        )

        childX += childPos.width + horizontalSpacing
      })
    }

    // Draw a single node
    const drawNode = (node: OrgNode, x: number, y: number) => {
      // Draw node background
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#e5e7eb"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.roundRect(x, y, nodeWidth, nodeHeight, 8)
      ctx.fill()
      ctx.stroke()

      // Draw avatar circle
      ctx.beginPath()
      ctx.arc(x + 30, y + nodeHeight / 2, 20, 0, Math.PI * 2)
      ctx.fillStyle = "#e5e7eb"
      ctx.fill()

      // Draw initials in avatar
      const initials = node.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()

      ctx.fillStyle = "#6b7280"
      ctx.font = "bold 16px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(initials, x + 30, y + nodeHeight / 2)

      // Draw name
      ctx.fillStyle = "#111827"
      ctx.font = "bold 14px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(
        node.name.length > 15 ? node.name.substring(0, 13) + "..." : node.name,
        x + 60,
        y + nodeHeight / 2 - 10,
      )

      // Draw role
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px sans-serif"
      ctx.fillText(
        node.role.length > 18 ? node.role.substring(0, 16) + "..." : node.role,
        x + 60,
        y + nodeHeight / 2 + 10,
      )
    }

    // Calculate positions for all nodes
    const positions = new Map<string, { x: number; y: number; width: number }>()

    // Process each root node
    let totalWidth = 0
    rootNodes.forEach((root) => {
      const { width } = getTreeDimensions(root, 0, positions)
      totalWidth += width + horizontalSpacing
    })
    totalWidth -= horizontalSpacing

    // Calculate starting X position
    let startX = (canvas.width - totalWidth) / 2

    // Draw each root tree
    rootNodes.forEach((root) => {
      const rootPos = positions.get(root.id)!
      const rootX = startX + rootPos.width / 2 - nodeWidth / 2

      drawTree(root, rootX, 20, positions)

      startX += rootPos.width + horizontalSpacing
    })
  }, [nodes])

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-auto">
          {!nodes || nodes.length === 0 ? (
            <div className="flex h-[400px] w-full items-center justify-center text-muted-foreground">
              No organization data available
            </div>
          ) : (
            <canvas ref={canvasRef} className="min-h-[400px] w-full" style={{ minWidth: nodes.length * 200 }} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
