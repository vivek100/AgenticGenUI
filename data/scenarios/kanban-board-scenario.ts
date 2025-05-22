export const kanbanBoardScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "kanbanboard",
    props: {
      title: "Project Tasks",
      description: "Drag tasks between columns to update their status",
      columns: [
        {
          id: "todo",
          title: "To Do",
          tasks: [
            { id: "task-1", title: "Research competitors", description: "Analyze top 5 competitors" },
            { id: "task-2", title: "Create wireframes", description: "Design initial UI concepts" },
            { id: "task-3", title: "Set up database", description: "Configure PostgreSQL" },
          ],
        },
        {
          id: "in-progress",
          title: "In Progress",
          tasks: [
            { id: "task-4", title: "Implement authentication", description: "Set up user login/signup" },
            { id: "task-5", title: "Design landing page", description: "Create responsive layout" },
          ],
        },
        {
          id: "done",
          title: "Done",
          tasks: [
            { id: "task-6", title: "Project setup", description: "Initialize repository and dependencies" },
            { id: "task-7", title: "Requirements gathering", description: "Document initial requirements" },
          ],
        },
      ],
    },
  },
}
