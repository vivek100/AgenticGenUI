export const searchWithFiltersDescription = {
  description: "Search input with filter chips",
  props: [
    { name: "title", type: "string", description: "Search title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "placeholder", type: "string", description: "Search input placeholder" },
    { name: "filters", type: "Array<Filter>", description: "Available filters" },
  ],
  events: [],
  toolCalls: [
    {
      name: "searchWithFilters",
      description: "Called when search is performed",
      args: "{ searchTerm: string, filters: Array<Filter> }",
    },
  ],
}
