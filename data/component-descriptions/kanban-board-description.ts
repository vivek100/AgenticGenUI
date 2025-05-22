export const kanbanBoardDescription = {
  description: "Drag-and-drop task board",
  props: [
    { name: "title", type: "string", description: "Board title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "columns", type: "Array<KanbanColumn>", description: "Board columns with tasks" },
  ],
  events: [],
  toolCalls: [
    {
      name: "updateKanbanBoard",
      description: "Called when a task is moved",
      args: "{ taskId: string, sourceColumnId: string, targetColumnId: string, updatedBoard: Array<KanbanColumn> }",
    },
  ],
}
