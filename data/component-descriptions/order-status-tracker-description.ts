export const orderStatusTrackerDescription = {
  description: "Tracks order status through defined steps",
  props: [
    { name: "title", type: "string", description: "Tracker title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "status", type: "string", description: "Current status ID" },
    {
      name: "steps",
      type: "Array<{id: string, label: string, description?: string, date?: string, icon?: string}>",
      description: "Status steps",
    },
  ],
  events: [],
  toolCalls: [],
}
