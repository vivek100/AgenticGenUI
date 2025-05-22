export const teamMemberListScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "teammemberlist",
    props: {
      title: "Project Team",
      description: "Select a team member to view details",
      members: [
        {
          id: "user-1",
          name: "Sarah Johnson",
          role: "Project Manager",
          status: "online",
          skills: ["Management", "Agile"],
        },
        {
          id: "user-2",
          name: "Michael Chen",
          role: "Senior Developer",
          status: "busy",
          skills: ["React", "Node.js", "TypeScript"],
        },
        {
          id: "user-3",
          name: "Emily Rodriguez",
          role: "UI/UX Designer",
          status: "away",
          skills: ["Figma", "Sketch", "User Research"],
        },
        {
          id: "user-4",
          name: "David Kim",
          role: "QA Engineer",
          status: "offline",
          skills: ["Testing", "Automation"],
        },
      ],
    },
  },
}
