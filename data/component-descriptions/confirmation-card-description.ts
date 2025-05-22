export const confirmationCardDescription = {
  description: "Yes/No choice with inline agent response",
  props: [
    { name: "title", type: "string", description: "Confirmation title" },
    { name: "message", type: "string", description: "Confirmation message" },
    { name: "confirmLabel", type: "string", description: "Text for confirm button" },
    { name: "cancelLabel", type: "string", description: "Text for cancel button" },
    { name: "importance", type: "'low' | 'medium' | 'high' | 'critical'", description: "Visual importance level" },
  ],
  events: [],
  toolCalls: [],
  responses: [
    { type: "User confirmed: [title]", description: "Sent when user confirms" },
    { type: "User declined: [title]", description: "Sent when user declines" },
  ],
}
