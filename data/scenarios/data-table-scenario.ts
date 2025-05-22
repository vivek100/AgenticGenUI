export const dataTableScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "datatable",
    props: {
      title: "User List",
      description: "All registered users",
      columns: [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
      ],
      data: [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
      ],
    },
  },
}
