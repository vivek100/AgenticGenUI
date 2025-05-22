export const toggleSwitchDescription = {
  description: "On/Off toggle with agent or tool trigger",
  props: [
    { name: "title", type: "string", description: "Toggle title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "defaultChecked", type: "boolean", description: "Initial state" },
    { name: "settingId", type: "string", description: "Unique ID for the setting" },
  ],
  events: [],
  toolCalls: [
    {
      name: "toggleSetting",
      description: "Called when toggle is changed",
      args: "{ settingId: string, enabled: boolean }",
    },
  ],
}
