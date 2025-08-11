export const languageSelectorScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "languageselector",
    props: {
      title: "Language Settings",
      description: "Choose your preferred language",
      languages: [
        { id: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
        { id: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
        { id: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
        { id: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
        { id: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
        { id: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
        { id: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
        { id: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
        { id: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
        { id: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
      ],
      currentLanguage: "en",
      showFlags: true,
      searchable: true,
    },
  },
}
