export const multiStepFormDescription = {
  description: "Multi-step form with progress indicator",
  props: [
    { name: "title", type: "string", description: "Form title" },
    { name: "description", type: "string", description: "Optional form description" },
    { name: "steps", type: "Array<Step>", description: "Form steps with fields" },
    { name: "submitLabel", type: "string", description: "Text for submit button" },
    { name: "cancelLabel", type: "string", description: "Text for cancel button" },
  ],
  events: [],
  toolCalls: [
    {
      name: "submitMultiStepForm",
      description: "Called when form is submitted",
      args: "{ formData: Record<string, string> }",
    },
  ],
}
