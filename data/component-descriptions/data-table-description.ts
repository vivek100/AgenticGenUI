export const dataTableDescription = {
  description: "Displays data rows with optional edit/delete actions",
  props: [
    { name: "title", type: "string", description: "Table title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "data", type: "Array<Record<string, any>>", description: "Data rows to display" },
    { name: "columns", type: "Array<{key: string, label: string}>", description: "Column definitions" },
    { name: "actions", type: "{edit?: boolean, delete?: boolean}", description: "Available row actions" },
  ],
  events: [],
  toolCalls: [
    {
      name: "editRow",
      description: "Called when edit button is clicked",
      args: "{ id: number | string, data: object }",
    },
    { name: "deleteRow", description: "Called when delete button is clicked", args: "{ id: number | string }" },
  ],
}
