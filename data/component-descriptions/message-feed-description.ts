export const messageFeedDescription = {
  description: "Displays a read-only chat history",
  props: [
    { name: "title", type: "string", description: "Feed title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "messages", type: "Array<Message>", description: "Messages to display" },
  ],
  events: [],
  toolCalls: [],
}
