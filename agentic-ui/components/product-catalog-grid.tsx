"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useAgentActions } from "../hooks/use-agent-actions"
import { ShoppingCart } from "lucide-react"

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  imageUrl?: string
  category?: string
  inStock?: boolean
  rating?: number
}

export interface ProductCatalogGridProps {
  title: string
  description?: string
  products: Product[]
  currency?: string
  className?: string
}

/**
 * ProductCatalogGrid - Displays a grid of product cards
 *
 * Actionable component that triggers product selection
 */
export function ProductCatalogGrid({
  title,
  description,
  products,
  currency = "USD",
  className,
}: ProductCatalogGridProps) {
  const { callTool } = useAgentActions()
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product.id)
    callTool("selectProduct", { productId: product.id })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(price)
  }

  // Generate star rating display
  const renderRating = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push("★")
    }

    if (hasHalfStar) {
      stars.push("★")
    }

    while (stars.length < 5) {
      stars.push("☆")
    }

    return <div className="text-amber-500">{stars.join("")}</div>
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className={cn(
                "overflow-hidden cursor-pointer transition-all hover:shadow-md",
                selectedProduct === product.id && "ring-2 ring-primary",
              )}
              onClick={() => handleSelectProduct(product)}
            >
              <div className="aspect-square relative bg-muted">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                )}
                {product.category && <Badge className="absolute top-2 right-2">{product.category}</Badge>}
              </div>

              <CardContent className="p-4">
                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                {product.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <div className="font-bold">{formatPrice(product.price)}</div>
                  {product.rating !== undefined && renderRating(product.rating)}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="text-sm">
                  {product.inStock !== false ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </div>
                <Button size="sm">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
