export const ratingSelectorDescription = {
  description: "Star rating input",
  props: [
    { name: "title", type: "string", description: "Rating title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "label", type: "string", description: "Rating label" },
    { name: "max", type: "number", description: "Maximum rating value" },
    { name: "value", type: "number", description: "Initial rating value" },
    { name: "submitLabel", type: "string", description: "Text for submit button" },
  ],
  events: [],
  toolCalls: [
    {
      name: "submitRating",
      description: "Called when rating is submitted",
      args: "{ rating: number }",
    },
  ],
}
