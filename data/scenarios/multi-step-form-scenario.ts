export const multiStepFormScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "multistepform",
    props: {
      title: "Create Account",
      description: "Complete all steps to create your account",
      steps: [
        {
          title: "Personal Info",
          description: "Your basic information",
          fields: [
            { id: "firstName", label: "First Name", type: "text", required: true },
            { id: "lastName", label: "Last Name", type: "text", required: true },
            { id: "email", label: "Email Address", type: "email", required: true },
          ],
        },
        {
          title: "Account Details",
          description: "Set up your account",
          fields: [
            { id: "username", label: "Username", type: "text", required: true },
            { id: "role", label: "Role", type: "select", required: true, options: ["User", "Admin", "Editor"] },
          ],
        },
        {
          title: "Preferences",
          description: "Set your preferences",
          fields: [
            { id: "bio", label: "Bio", type: "textarea" },
            {
              id: "notifications",
              label: "Notification Frequency",
              type: "select",
              options: ["Daily", "Weekly", "Monthly"],
            },
          ],
        },
      ],
    },
  },
}
