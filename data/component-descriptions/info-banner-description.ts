export const infoBannerDescription = {
  description: "Displays a status message or notification",
  props: [
    { name: "title", type: "string", description: "Banner title" },
    { name: "message", type: "string", description: "Banner message" },
    { name: "type", type: "'info' | 'success' | 'warning' | 'error'", description: "Banner type" },
  ],
  events: [],
  toolCalls: [],
}
