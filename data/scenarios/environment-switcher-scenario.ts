export const environmentSwitcherScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "environmentswitcher",
    props: {
      title: "Environment Selector",
      description: "Switch between different deployment environments",
      environments: [
        {
          id: "env-1",
          name: "Production",
          url: "https://app.example.com",
          status: "healthy",
          region: "US East",
          lastDeployed: "2023-06-14T10:30:00Z",
        },
        {
          id: "env-2",
          name: "Staging",
          url: "https://staging.example.com",
          status: "healthy",
          region: "US East",
          lastDeployed: "2023-06-15T15:45:00Z",
        },
        {
          id: "env-3",
          name: "Development",
          url: "https://dev.example.com",
          status: "healthy",
          region: "US East",
          lastDeployed: "2023-06-15T16:20:00Z",
        },
        {
          id: "env-4",
          name: "QA",
          url: "https://qa.example.com",
          status: "issues",
          region: "EU West",
          lastDeployed: "2023-06-15T09:15:00Z",
        },
        {
          id: "env-5",
          name: "Demo",
          url: "https://demo.example.com",
          status: "healthy",
          region: "Asia Pacific",
          lastDeployed: "2023-06-10T11:30:00Z",
        },
      ],
      currentEnvironment: "env-2",
    },
  },
}
