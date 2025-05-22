export const messageFeedScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "messagefeed",
    props: {
      title: "Support Conversation",
      description: "Your conversation with our support team",
      messages: [
        {
          id: "msg-1",
          sender: {
            name: "Support Agent",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "Hello! How can I help you today?",
          timestamp: "2023-05-15T10:00:00Z",
        },
        {
          id: "msg-2",
          sender: {
            name: "You",
          },
          content: "I'm having trouble resetting my password. The reset email never arrives.",
          timestamp: "2023-05-15T10:02:00Z",
          isCurrentUser: true,
        },
        {
          id: "msg-3",
          sender: {
            name: "Support Agent",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content: "I'm sorry to hear that. Let me check your account. Could you please confirm your email address?",
          timestamp: "2023-05-15T10:03:00Z",
        },
        {
          id: "msg-4",
          sender: {
            name: "You",
          },
          content: "It's user@example.com",
          timestamp: "2023-05-15T10:04:00Z",
          isCurrentUser: true,
        },
        {
          id: "msg-5",
          sender: {
            name: "Support Agent",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content:
            "Thank you. I've checked your account and it looks like your email was misspelled in our system. I've corrected it and sent a new password reset link. Please check your inbox in a few minutes.",
          timestamp: "2023-05-15T10:07:00Z",
        },
      ],
    },
  },
}
