export const timelineScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "timeline", // Ensure this matches the registered name in registry.ts
    props: {
      title: "Project Timeline",
      description: "Recent project activities",
      events: [
        {
          id: "1",
          title: "Project Started",
          description: "Initial kickoff meeting",
          timestamp: "2023-01-15 09:00",
          type: "success",
        },
        {
          id: "2",
          title: "Design Phase",
          description: "UI/UX design completed",
          timestamp: "2023-01-20 14:30",
          type: "default",
        },
        {
          id: "3",
          title: "Development Delay",
          description: "Backend integration issues",
          timestamp: "2023-01-25 11:15",
          type: "warning",
        },
        {
          id: "4",
          title: "Testing Failed",
          description: "Critical bugs found in login flow",
          timestamp: "2023-01-30 16:45",
          type: "error",
        },
      ],
    },
  },
}
