"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"

export interface GalleryImage {
  src: string
  alt?: string
  caption?: string
}

export interface ImageGalleryProps {
  title: string
  description?: string
  images: GalleryImage[]
  columns?: 1 | 2 | 3 | 4
  className?: string
}

/**
 * ImageGallery - Zoomable image viewer with lightbox
 *
 * Component for displaying and interacting with a collection of images
 */
export function ImageGallery({ title, description, images, columns = 3, className }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleOpenLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevious()
    } else if (e.key === "ArrowRight") {
      handleNext()
    } else if (e.key === "Escape") {
      setLightboxOpen(false)
    }
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "grid gap-4",
            columns === 1 && "grid-cols-1",
            columns === 2 && "grid-cols-1 sm:grid-cols-2",
            columns === 3 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
            columns === 4 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          )}
        >
          {images.map((image, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden rounded-md border bg-muted">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt || `Image ${index + 1}`}
                className="h-full w-full object-cover transition-all group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
                <Button variant="secondary" size="icon" onClick={() => handleOpenLightbox(index)} className="h-8 w-8">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-xs text-white">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none" onKeyDown={handleKeyDown}>
          <div className="relative flex items-center justify-center">
            <div className="relative aspect-auto max-h-[80vh] overflow-hidden rounded-lg bg-black">
              <img
                src={images[currentImageIndex]?.src || "/placeholder.svg"}
                alt={images[currentImageIndex]?.alt || `Image ${currentImageIndex + 1}`}
                className="h-full w-full object-contain"
              />
              {images[currentImageIndex]?.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                  {images[currentImageIndex].caption}
                </div>
              )}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-2 text-center text-sm text-white">
            {currentImageIndex + 1} / {images.length}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
