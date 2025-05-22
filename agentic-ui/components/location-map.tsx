"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"

export interface MapMarker {
  lat: number
  lng: number
  label?: string
}

export interface LocationMapProps {
  title: string
  description?: string
  center: { lat: number; lng: number }
  zoom?: number
  markers?: MapMarker[]
  interactive?: boolean
  className?: string
}

/**
 * LocationMap - Displays a map with optional pin placements
 *
 * Interactive map component that can display markers and handle clicks
 */
export function LocationMap({
  title,
  description,
  center = { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
  zoom = 13,
  markers = [],
  interactive = true,
  className,
}: LocationMapProps) {
  const { callTool } = useAgentActions()
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Generate OpenStreetMap URL with markers
  const generateMapUrl = () => {
    // Base URL for OpenStreetMap
    let url = `https://www.openstreetmap.org/export/embed.html?bbox=${
      center.lng - 0.1
    },${center.lat - 0.1},${center.lng + 0.1},${center.lat + 0.1}&layer=mapnik`

    // Add center and zoom
    url += `&marker=${center.lat},${center.lng}`

    return url
  }

  // Handle map click simulation (since we can't directly interact with the iframe)
  const handleMapClick = () => {
    if (!interactive) return

    // For demo purposes, we'll simulate a click near the center with some randomness
    const randomOffset = () => (Math.random() - 0.5) * 0.01
    const lat = center.lat + randomOffset()
    const lng = center.lng + randomOffset()

    setSelectedLocation({ lat, lng })

    // Notify the agent
    callTool("selectLocation", { lat, lng })
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div
          ref={mapContainerRef}
          className={cn(
            "w-full h-[300px] bg-slate-100 rounded-md relative overflow-hidden",
            interactive && "cursor-crosshair",
          )}
          onClick={interactive ? handleMapClick : undefined}
        >
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
          {interactive && (
            <div className="absolute inset-0 bg-transparent cursor-crosshair z-10" onClick={handleMapClick} />
          )}
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          {interactive ? "Click on the map to select a location" : "Map view (not interactive)"}
        </div>

        {markers.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Markers</h4>
            <ul className="text-sm space-y-1">
              {markers.map((marker, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>
                    {marker.label || `Marker ${index + 1}`}: {marker.lat.toFixed(6)}, {marker.lng.toFixed(6)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedLocation && (
          <div className="mt-4 p-3 bg-muted rounded-md">
            <h4 className="text-sm font-medium mb-1">Selected Location</h4>
            <p className="text-sm">
              Latitude: {selectedLocation.lat.toFixed(6)}, Longitude: {selectedLocation.lng.toFixed(6)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
