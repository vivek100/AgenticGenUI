"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { Route, Trash2 } from "lucide-react"

export interface Waypoint {
  lat: number
  lng: number
  label?: string
}

export interface RoutePlannerMapProps {
  title: string
  description?: string
  center: { lat: number; lng: number }
  zoom?: number
  waypoints?: Waypoint[]
  className?: string
}

/**
 * RoutePlannerMap - Multi-point route planner
 *
 * Interactive map component for planning routes with multiple waypoints
 */
export function RoutePlannerMap({
  title,
  description,
  center = { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
  zoom = 12,
  waypoints: initialWaypoints = [],
  className,
}: RoutePlannerMapProps) {
  const { callTool } = useAgentActions()
  const [waypoints, setWaypoints] = useState<Waypoint[]>(initialWaypoints)

  // Generate OpenStreetMap URL with waypoints
  const generateMapUrl = () => {
    // Base URL for OpenStreetMap
    let url = `https://www.openstreetmap.org/export/embed.html?bbox=${
      center.lng - 0.1
    },${center.lat - 0.1},${center.lng + 0.1},${center.lat + 0.1}&layer=mapnik`

    // Add waypoints as markers
    if (waypoints.length > 0) {
      waypoints.forEach((wp) => {
        url += `&marker=${wp.lat},${wp.lng}`
      })
    } else {
      // If no waypoints, just show the center
      url += `&marker=${center.lat},${center.lng}`
    }

    return url
  }

  // Handle map click simulation (since we can't directly interact with the iframe)
  const handleMapClick = () => {
    // For demo purposes, we'll simulate a click near the center with some randomness
    const randomOffset = () => (Math.random() - 0.5) * 0.01
    const lat = center.lat + randomOffset()
    const lng = center.lng + randomOffset()

    // Add new waypoint
    const newWaypoint: Waypoint = {
      lat,
      lng,
      label: `Waypoint ${waypoints.length + 1}`,
    }

    setWaypoints([...waypoints, newWaypoint])
  }

  const handleRemoveWaypoint = (index: number) => {
    const updatedWaypoints = waypoints.filter((_, i) => i !== index)
    setWaypoints(updatedWaypoints)
  }

  const handleClearWaypoints = () => {
    setWaypoints([])
  }

  const handleCalculateRoute = () => {
    if (waypoints.length < 2) return
    callTool("calculateRoute", { waypoints })
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] bg-slate-100 rounded-md relative overflow-hidden cursor-crosshair">
          {/* Embedded OpenStreetMap */}
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={generateMapUrl()}
            style={{ border: 0 }}
            title="OpenStreetMap"
          />

          {/* Overlay for click handling */}
          <div className="absolute inset-0 bg-transparent cursor-crosshair z-10" onClick={handleMapClick} />
        </div>

        <div className="mt-2 text-xs text-muted-foreground">Click on the map to add waypoints to your route</div>

        {waypoints.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Waypoints</h4>
              <Button variant="ghost" size="sm" onClick={handleClearWaypoints}>
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
            <ul className="text-sm space-y-2">
              {waypoints.map((waypoint, index) => (
                <li key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "flex items-center justify-center w-6 h-6 rounded-full text-primary-foreground text-xs font-medium mr-2",
                        index === 0 ? "bg-green-500" : index === waypoints.length - 1 ? "bg-red-500" : "bg-blue-500",
                      )}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{waypoint.label || `Waypoint ${index + 1}`}</div>
                      <div className="text-xs text-muted-foreground">
                        {waypoint.lat.toFixed(6)}, {waypoint.lng.toFixed(6)}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveWaypoint(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {waypoints.length} waypoint{waypoints.length !== 1 ? "s" : ""}
        </div>
        <Button onClick={handleCalculateRoute} disabled={waypoints.length < 2}>
          <Route className="mr-2 h-4 w-4" />
          Calculate Route
        </Button>
      </CardFooter>
    </Card>
  )
}
