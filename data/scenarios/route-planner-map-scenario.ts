export const routePlannerMapScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "routeplannermap",
    props: {
      title: "Delivery Route Planner",
      description: "Plan your delivery route by adding waypoints",
      center: { lat: 37.7749, lng: -122.4194 }, // San Francisco
      zoom: 12,
      waypoints: [
        {
          lat: 37.7749,
          lng: -122.4194,
          label: "Warehouse",
        },
        {
          lat: 37.7955,
          lng: -122.3937,
          label: "Customer A",
        },
        {
          lat: 37.7577,
          lng: -122.4376,
          label: "Customer B",
        },
      ],
    },
  },
}
