export const threadedCommentsScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "threadedcomments",
    props: {
      title: "Document Feedback",
      description: "Comments and discussions on the proposal document",
      comments: [
        {
          id: "comment-1",
          author: {
            name: "Alex Johnson",
            avatar: "/diverse-group-avatars.png",
          },
          content: "I think we should expand more on the implementation details in section 3.",
          timestamp: "2023-06-15T10:30:00Z",
          replies: [
            {
              id: "comment-1-1",
              author: {
                name: "Sarah Miller",
                avatar: "/pandora-ocean-scene.png",
              },
              content: "Agreed. We need to include specific technologies and frameworks we plan to use.",
              timestamp: "2023-06-15T10:45:00Z",
            },
            {
              id: "comment-1-2",
              author: {
                name: "David Chen",
                avatar: "/diverse-group-futuristic-setting.png",
              },
              content: "I can draft that section by tomorrow. Will include the tech stack and deployment strategy.",
              timestamp: "2023-06-15T11:00:00Z",
            },
          ],
        },
        {
          id: "comment-2",
          author: {
            name: "Emily Rodriguez",
            avatar: "/diverse-group-futuristic-avatars.png",
          },
          content: "The budget section needs updating with the latest figures from finance.",
          timestamp: "2023-06-15T13:20:00Z",
          replies: [
            {
              id: "comment-2-1",
              author: {
                name: "Michael Scott",
                avatar: "/diverse-futuristic-avatars.png",
              },
              content: "I'll reach out to finance and get the updated numbers by EOD.",
              timestamp: "2023-06-15T13:30:00Z",
            },
          ],
        },
        {
          id: "comment-3",
          author: {
            name: "Jessica Wong",
            avatar: "/diverse-group-avatars.png",
          },
          content: "The timeline looks too aggressive. I suggest extending the QA phase by at least a week.",
          timestamp: "2023-06-15T14:15:00Z",
        },
      ],
    },
  },
}
