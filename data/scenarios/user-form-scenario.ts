export const userFormScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "userform",
    props: {
      title: "Create User",
      description: "Add a new user to the system",
      fields: [
        { id: "name", label: "Full Name", type: "text", required: true },
        { id: "email", label: "Email Address", type: "email", required: true },
        { id: "role", label: "Role", type: "text" },
        { id: "notes", label: "Notes", type: "textarea" },
      ],
    },
  },
}
