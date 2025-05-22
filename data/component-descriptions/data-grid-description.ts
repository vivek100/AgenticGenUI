export const dataGridDescription = {
  description: "Full-width, paginated, sortable grid for displaying tabular data",
  props: [
    { name: "title", type: "string", description: "Grid title" },
    { name: "description", type: "string", description: "Optional description" },
    {
      name: "columns",
      type: "Array<{key: string, label: string, sortable?: boolean}>",
      description: "Column definitions with optional sorting",
    },
    { name: "rows", type: "Array<Record<string, any>>", description: "Data rows to display" },
    { name: "pageSize", type: "number", description: "Number of rows per page (default: 5)" },
  ],
  events: [],
  toolCalls: [
    {
      name: "gridPageChange",
      description: "Called when page is changed",
      args: "{ page: number }",
    },
    {
      name: "gridSort",
      description: "Called when a column is sorted",
      args: "{ column: string, direction: 'asc' | 'desc' }",
    },
    {
      name: "gridRowAction",
      description: "Called when a row is clicked",
      args: "{ action: 'select', rowData: object, rowIndex: number }",
    },
  ],
}
