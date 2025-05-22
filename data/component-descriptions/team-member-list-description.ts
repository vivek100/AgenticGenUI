export const teamMemberListDescription = {
  description: "Displays a team with roles",
  props: [
    { name: "title", type: "string", description: "List title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "members", type: "Array<TeamMember>", description: "Team members to display" },
  ],
  events: [],
  toolCalls: [
    {
      name: "selectTeamMember",
      description: "Called when a team member is selected",
      args: "{ memberId: string }",
    },
  ],
}
