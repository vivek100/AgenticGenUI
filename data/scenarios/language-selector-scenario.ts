export const languageSelectorScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "languageselector",
    props: {
      title: "Language Settings",
      description: "Choose your preferred languages",
      languages: [
        { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
        { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
        { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
        { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
        { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
        { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
        { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
        { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
        { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
        { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
      ],
      current: "en",
      showFlags: true,
      searchable: true,
    },
  },
}
