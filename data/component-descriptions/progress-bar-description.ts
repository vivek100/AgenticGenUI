export const progressBarDescription = {
  description: "Shows task progress, optionally interactive",
  props: [
    { name: "title", type: "string", description: "Progress title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "value", type: "number", description: "Current progress value" },
    { name: "max", type: "number", description: "Maximum progress value" },
    { name: "showValue", type: "boolean", description: "Whether to show numeric value" },
    { name: "interactive", type: "boolean", description: "Whether to show interactive controls" },
  ],
  events: [],
  toolCalls: [],
  responses: [
    { type: "User canceled: [title]", description: "Sent when user cancels" },
    { type: "User marked as complete: [title]", description: "Sent when user marks as complete" },
  ],
}
