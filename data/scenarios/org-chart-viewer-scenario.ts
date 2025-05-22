export const orgChartViewerScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "orgchartviewer",
    props: {
      title: "Company Organization",
      description: "Organizational structure and reporting relationships",
      nodes: [
        {
          id: "1",
          name: "John Smith",
          role: "CEO",
          parentId: undefined,
        },
        {
          id: "2",
          name: "Sarah Johnson",
          role: "CTO",
          parentId: "1",
        },
        {
          id: "3",
          name: "Robert Brown",
          role: "CFO",
          parentId: "1",
        },
        {
          id: "4",
          name: "Amanda Miller",
          role: "CMO",
          parentId: "1",
        },
        {
          id: "5",
          name: "David Wilson",
          role: "Engineering Director",
          parentId: "2",
        },
        {
          id: "6",
          name: "Jessica Lee",
          role: "QA Director",
          parentId: "2",
        },
        {
          id: "7",
          name: "Lisa Park",
          role: "Finance Manager",
          parentId: "3",
        },
        {
          id: "8",
          name: "Daniel Clark",
          role: "Marketing Director",
          parentId: "4",
        },
        {
          id: "9",
          name: "Emily Chen",
          role: "Frontend Lead",
          parentId: "5",
        },
        {
          id: "10",
          name: "Michael Rodriguez",
          role: "Backend Lead",
          parentId: "5",
        },
      ],
    },
  },
}
