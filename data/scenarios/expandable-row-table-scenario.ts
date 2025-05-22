export const expandableRowTableScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "expandablerowtable",
    props: {
      title: "Projects Overview",
      description: "All active and completed projects",
      columns: [
        { id: "name", header: "Project Name", accessorKey: "name" },
        { id: "status", header: "Status", accessorKey: "status" },
        { id: "progress", header: "Progress", accessorKey: "progress" },
        { id: "dueDate", header: "Due Date", accessorKey: "dueDate" },
      ],
      data: [
        {
          id: "proj-1",
          name: "Website Redesign",
          status: "In Progress",
          progress: 65,
          dueDate: "2023-08-15",
          details: {
            description: "Complete overhaul of company website with new branding and improved UX/UI.",
            team: [
              { name: "Sarah Johnson", role: "Project Manager" },
              { name: "David Chen", role: "Lead Developer" },
              { name: "Emily Rodriguez", role: "UX Designer" },
            ],
            milestones: [
              { name: "Requirements Gathering", status: "Completed", date: "2023-05-10" },
              { name: "Design Mockups", status: "Completed", date: "2023-06-20" },
              { name: "Frontend Development", status: "In Progress", date: "2023-07-30" },
              { name: "Backend Integration", status: "Pending", date: "2023-08-10" },
              { name: "Testing & Launch", status: "Pending", date: "2023-08-15" },
            ],
            budget: {
              allocated: "$50,000",
              spent: "$32,500",
              remaining: "$17,500",
            },
          },
        },
        {
          id: "proj-2",
          name: "Mobile App Development",
          status: "Planning",
          progress: 20,
          dueDate: "2023-10-30",
          details: {
            description: "Create a native mobile application for iOS and Android platforms.",
            team: [
              { name: "Michael Scott", role: "Project Manager" },
              { name: "Jessica Wong", role: "Mobile Developer" },
              { name: "Alex Johnson", role: "UI Designer" },
            ],
            milestones: [
              { name: "Requirements Gathering", status: "Completed", date: "2023-06-15" },
              { name: "Design Mockups", status: "In Progress", date: "2023-07-30" },
              { name: "iOS Development", status: "Pending", date: "2023-09-15" },
              { name: "Android Development", status: "Pending", date: "2023-09-30" },
              { name: "Testing & Launch", status: "Pending", date: "2023-10-30" },
            ],
            budget: {
              allocated: "$75,000",
              spent: "$15,000",
              remaining: "$60,000",
            },
          },
        },
        {
          id: "proj-3",
          name: "CRM Integration",
          status: "Completed",
          progress: 100,
          dueDate: "2023-05-30",
          details: {
            description: "Integration of new CRM system with existing customer database and support tools.",
            team: [
              { name: "Lisa Park", role: "Project Manager" },
              { name: "John Smith", role: "Backend Developer" },
              { name: "Robert Kim", role: "Database Administrator" },
            ],
            milestones: [
              { name: "Requirements Gathering", status: "Completed", date: "2023-02-10" },
              { name: "System Design", status: "Completed", date: "2023-03-15" },
              { name: "Development", status: "Completed", date: "2023-04-20" },
              { name: "Testing", status: "Completed", date: "2023-05-15" },
              { name: "Deployment", status: "Completed", date: "2023-05-25" },
            ],
            budget: {
              allocated: "$40,000",
              spent: "$38,500",
              remaining: "$1,500",
            },
          },
        },
      ],
      pagination: true,
      pageSize: 10,
    },
  },
}
