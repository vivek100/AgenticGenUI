export const avatarCardDescription = {
  description: "Displays user profile picture + info",
  props: [
    { name: "name", type: "string", description: "User name" },
    { name: "role", type: "string", description: "Optional user role" },
    { name: "imageUrl", type: "string", description: "Optional profile image URL" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "status", type: "'online' | 'offline' | 'away' | 'busy'", description: "Optional status" },
    { name: "badges", type: "string[]", description: "Optional badges to display" },
  ],
  events: [],
  toolCalls: [],
}
