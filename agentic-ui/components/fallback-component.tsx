import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface FallbackComponentProps {
  componentType: string
  props: Record<string, any>
  error?: string
}

export function FallbackComponent({ componentType, props, error }: FallbackComponentProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-amber-600">Component Rendering Issue</CardTitle>
        <CardDescription>There was an issue rendering the requested component</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || `Could not render component of type "${componentType}"`}</AlertDescription>
        </Alert>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Component Type:</h3>
          <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">{componentType}</pre>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Provided Props:</h3>
          <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">{JSON.stringify(props, null, 2)}</pre>
        </div>
      </CardContent>
    </Card>
  )
}
