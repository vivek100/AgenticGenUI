export const chartDescription = {
  description: "Renders JSON data as a chart preview",
  props: [
    { name: "title", type: "string", description: "Chart title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "data", type: "Array<{x: string | number, y: number}>", description: "Data points for the chart" },
    { name: "type", type: "'line' | 'bar'", description: "Chart type (defaults to line)" },
  ],
  events: [],
  toolCalls: [],
}
