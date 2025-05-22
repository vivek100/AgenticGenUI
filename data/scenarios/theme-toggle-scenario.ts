export const themeToggleScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "themetoggle",
    props: {
      title: "Theme Preference",
      description: "Choose your preferred color scheme",
      themes: [
        { id: "light", name: "Light", icon: "sun" },
        { id: "dark", name: "Dark", icon: "moon" },
        { id: "system", name: "System", icon: "monitor" },
      ],
      currentTheme: "system",
    },
  },
}
