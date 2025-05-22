export const approvalWorkflowCardDescription = {
  description: "Approve/Reject workflow step",
  props: [
    { name: "title", type: "string", description: "Approval title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "message", type: "string", description: "Content to approve/reject" },
    { name: "approveLabel", type: "string", description: "Text for approve button" },
    { name: "rejectLabel", type: "string", description: "Text for reject button" },
    { name: "requireComment", type: "boolean", description: "Whether comment is required for rejection" },
  ],
  events: [],
  toolCalls: [
    {
      name: "approveWorkflowStep",
      description: "Called when approve/reject is clicked",
      args: "{ approved: boolean, comment?: string }",
    },
  ],
}
