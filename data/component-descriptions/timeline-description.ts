export const timelineDescription = {
  description: "Displays event logs with timestamps",
  props: [
    { name: "title", type: "string", description: "Timeline title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "events", type: "Array<TimelineEvent>", description: "Timeline events to display" },
  ],
  events: [],
  toolCalls: [],
}
