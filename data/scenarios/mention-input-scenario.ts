export const mentionInputScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "mentioninput",
    props: {
      title: "Team Message",
      description: "Send a message to your team members",
      placeholder: "Type your message here...",
      mentionOptions: [
        { id: "user-1", name: "Sarah Johnson", role: "Project Manager", avatar: "/diverse-group-avatars.png" },
        { id: "user-2", name: "Michael Chen", role: "Developer", avatar: "/pandora-ocean-scene.png" },
        { id: "user-3", name: "Emily Rodriguez", role: "Designer", avatar: "/diverse-group-futuristic-setting.png" },
        { id: "user-4", name: "David Kim", role: "Marketing", avatar: "/diverse-group-futuristic-avatars.png" },
        { id: "user-5", name: "Alex Johnson", role: "Sales", avatar: "/diverse-futuristic-avatars.png" },
        { id: "user-6", name: "Jessica Wang", role: "Customer Support", avatar: "/diverse-group-avatars.png" },
      ],
      initialValue:
        "Hey team, let's discuss the project timeline. @Sarah Johnson what's the status of the design phase?",
    },
  },
}
