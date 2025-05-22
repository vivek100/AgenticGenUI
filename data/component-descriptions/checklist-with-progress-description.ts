export const checklistWithProgressDescription = {
  description: "Interactive checklist with progress indicator",
  props: [
    { name: "title", type: "string", description: "Checklist title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "items", type: "Array<ChecklistItem>", description: "Checklist items" },
  ],
  events: [],
  toolCalls: [
    {
      name: "updateChecklistProgress",
      description: "Called when an item is checked/unchecked",
      args: "{ items: Array<ChecklistItem>, progress: number }",
    },
  ],
}
