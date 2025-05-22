export const metricCardGridScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "metriccardgrid",
    props: {
      metrics: [
        {
          name: "Revenue",
          value: "$25,000",
          icon: "money",
          trend: { value: 12, isPositive: true },
        },
        {
          name: "Customers",
          value: 526,
          icon: "users",
          trend: { value: 8, isPositive: true },
        },
        {
          name: "New Signups",
          value: 123,
          icon: "create",
          trend: { value: 15, isPositive: true },
        },
        {
          name: "Session Duration",
          value: "2h 45m",
          icon: "clock",
          trend: { value: 5, isPositive: false },
        },
      ],
    },
  },
}
