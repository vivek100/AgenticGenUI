export const metricCardDescription = {
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
}
