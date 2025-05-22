export const modalPromptScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "modalprompt",
    props: {
      title: "Dialog Examples",
      description: "Various dialog prompts for different actions",
      dialogs: [
        {
          id: "dialog-1",
          title: "Confirm Delete",
          description: "Are you sure you want to delete this item? This action cannot be undone.",
          type: "warning",
          primaryButton: {
            text: "Delete",
            variant: "destructive",
          },
          secondaryButton: {
            text: "Cancel",
          },
        },
        {
          id: "dialog-2",
          title: "Subscribe to Newsletter",
          description: "Stay updated with our latest news and product updates.",
          type: "form",
          form: {
            fields: [
              { id: "email", label: "Email Address", type: "email", required: true },
              { id: "frequency", label: "Frequency", type: "select", options: ["Daily", "Weekly", "Monthly"] },
              { id: "marketing", label: "I agree to receive marketing emails", type: "checkbox" },
            ],
          },
          primaryButton: {
            text: "Subscribe",
          },
          secondaryButton: {
            text: "No Thanks",
          },
        },
        {
          id: "dialog-3",
          title: "Success",
          description: "Your changes have been saved successfully!",
          type: "success",
          primaryButton: {
            text: "Continue",
          },
        },
        {
          id: "dialog-4",
          title: "Session Timeout",
          description: "Your session is about to expire due to inactivity.",
          type: "info",
          countdown: 60,
          primaryButton: {
            text: "Stay Logged In",
          },
          secondaryButton: {
            text: "Logout",
          },
        },
      ],
    },
  },
}
