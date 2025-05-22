// Component descriptions for the explorer
export const componentDescriptions = {
  metricCard: {
    description: "Displays a numeric value with a label and optional trend indicator",
    props: [
      { name: "title", type: "string", description: "Title of the metric" },
      { name: "value", type: "string | number", description: "Value to display" },
      { name: "description", type: "string", description: "Optional description text" },
      { name: "trend", type: "object", description: "Optional trend data with value and direction" },
      { name: "icon", type: "ReactNode", description: "Optional icon to display" },
    ],
    events: [],
    toolCalls: [],
  },
  chart: {
    description: "Renders JSON data as a chart preview",
    props: [
      { name: "title", type: "string", description: "Chart title" },
      { name: "description", type: "string", description: "Optional description" },
      { name: "data", type: "Array<{x: string | number, y: number}>", description: "Data points for the chart" },
      { name: "type", type: "'line' | 'bar'", description: "Chart type (defaults to line)" },
    ],
    events: [],
    toolCalls: [],
  },
  dataTable: {
    description: "Displays data rows with optional edit/delete actions",
    props: [
      { name: "title", type: "string", description: "Table title" },
      { name: "description", type: "string", description: "Optional description" },
      { name: "data", type: "Array<Record<string, any>>", description: "Data rows to display" },
      { name: "columns", type: "Array<{key: string, label: string}>", description: "Column definitions" },
      { name: "actions", type: "{edit?: boolean, delete?: boolean}", description: "Available row actions" },
    ],
    events: [],
    toolCalls: [
      {
        name: "editRow",
        description: "Called when edit button is clicked",
        args: "{ id: number | string, data: object }",
      },
      { name: "deleteRow", description: "Called when delete button is clicked", args: "{ id: number | string }" },
    ],
  },
}
