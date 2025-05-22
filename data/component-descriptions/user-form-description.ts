export const userFormDescription = {
  description: "Basic form to capture user info and submit",
  props: [
    { name: "title", type: "string", description: "Form title" },
    { name: "description", type: "string", description: "Optional form description" },
    { name: "fields", type: "Array<FormField>", description: "Form field definitions" },
    { name: "submitLabel", type: "string", description: "Text for submit button" },
    { name: "cancelLabel", type: "string", description: "Text for cancel button" },
  ],
  events: [],
  toolCalls: [
    {
      name: "submitForm",
      description: "Called when form is submitted",
      args: "{ formData: Record<string, string> }",
    },
  ],
}
