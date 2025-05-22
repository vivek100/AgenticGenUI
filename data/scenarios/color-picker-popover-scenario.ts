export const colorPickerPopoverScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "colorpickerpopover",
    props: {
      title: "Theme Customization",
      description: "Choose colors for your dashboard theme",
      colorSchemes: [
        {
          name: "Primary",
          defaultColor: "#3b82f6",
          description: "Main brand color used for primary buttons and accents",
        },
        {
          name: "Secondary",
          defaultColor: "#6b7280",
          description: "Used for secondary buttons and less prominent UI elements",
        },
        {
          name: "Accent",
          defaultColor: "#8b5cf6",
          description: "Highlight color used for selected states and focus indicators",
        },
        { name: "Background", defaultColor: "#ffffff", description: "Main background color of the application" },
        { name: "Text", defaultColor: "#1f2937", description: "Default text color throughout the application" },
      ],
      presets: [
        {
          name: "Default",
          colors: {
            Primary: "#3b82f6",
            Secondary: "#6b7280",
            Accent: "#8b5cf6",
            Background: "#ffffff",
            Text: "#1f2937",
          },
        },
        {
          name: "Dark Mode",
          colors: {
            Primary: "#60a5fa",
            Secondary: "#9ca3af",
            Accent: "#a78bfa",
            Background: "#1f2937",
            Text: "#f9fafb",
          },
        },
        {
          name: "Earthy",
          colors: {
            Primary: "#84cc16",
            Secondary: "#78716c",
            Accent: "#ca8a04",
            Background: "#f5f5f4",
            Text: "#44403c",
          },
        },
        {
          name: "Ocean",
          colors: {
            Primary: "#0ea5e9",
            Secondary: "#64748b",
            Accent: "#06b6d4",
            Background: "#f0f9ff",
            Text: "#0f172a",
          },
        },
      ],
    },
  },
}
