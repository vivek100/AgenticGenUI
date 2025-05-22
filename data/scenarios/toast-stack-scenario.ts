export const toastStackScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "toaststack",
    props: {
      title: "Notification System",
      description: "Manage your notifications",
      toasts: [
        {
          id: "toast-1",
          message: "Operation completed successfully",
          type: "success",
          duration: 5000,
        },
        {
          id: "toast-2",
          message: "Warning: This action cannot be undone",
          type: "warning",
          duration: 8000,
        },
        {
          id: "toast-3",
          message: "Error: Failed to complete the operation",
          type: "error",
          duration: 10000,
        },
        {
          id: "toast-4",
          message: "Information: Your session will expire in 10 minutes",
          type: "info",
          duration: 7000,
        },
      ],
    },
  },
}
