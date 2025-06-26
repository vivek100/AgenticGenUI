"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
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
 * OrgChartViewer - Visual org chart tree view with pan and zoom
 *
 * Component for displaying organizational hierarchies with interactive navigation
 */
export function OrgChartViewer({ title, description, nodes = [], className }: OrgChartViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Pan and zoom state
  const [zoom, setZoom] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })

  // Zoom constants
  const MIN_ZOOM = 0.1
  const MAX_ZOOM = 3
  const ZOOM_STEP = 0.1

  // Zoom and pan control functions
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM))
  }, [])

  const handleReset = useCallback(() => {
    setZoom(1)
    setPanX(0)
    setPanY(0)
  }, [])

  // Mouse event handlers for pan functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - lastMousePos.x
    const deltaY = e.clientY - lastMousePos.y
    
    setPanX(prev => prev + deltaX)
    setPanY(prev => prev + deltaY)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }, [isDragging, lastMousePos])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Wheel event handler for zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
    setZoom(prev => Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, prev + delta)))
  }, [])

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

    // Apply transformations for zoom and pan
    ctx.save()
    ctx.translate(panX, panY)
    ctx.scale(zoom, zoom)

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

    // Restore canvas state
    ctx.restore()
  }, [nodes, zoom, panX, panY])

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {nodes && nodes.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= MIN_ZOOM}
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= MAX_ZOOM}
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              aria-label="Reset view"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div 
          ref={containerRef}
          className="relative w-full h-[500px] overflow-hidden border rounded-md"
        >
          {!nodes || nodes.length === 0 ? (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              No organization data available
            </div>
          ) : (
            <canvas 
              ref={canvasRef} 
              className="w-full h-full cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              style={{ 
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            />
          )}
        </div>
        {nodes && nodes.length > 0 && (
          <div className="mt-2 text-xs text-muted-foreground text-center">
            Use mouse wheel to zoom, drag to pan
          </div>
        )}
      </CardContent>
    </Card>
  )
}
