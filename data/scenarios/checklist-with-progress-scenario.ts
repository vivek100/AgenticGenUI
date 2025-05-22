export const checklistWithProgressScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "checklistwithprogress",
    props: {
      title: "Project Launch Checklist",
      description: "Tasks to complete before launch",
      items: [
        { id: "task-1", label: "Complete user testing", checked: true },
        { id: "task-2", label: "Fix critical bugs", checked: true },
        { id: "task-3", label: "Update documentation", checked: false },
        { id: "task-4", label: "Prepare marketing materials", checked: false },
        { id: "task-5", label: "Deploy to production", checked: false },
      ],
    },
  },
}
