export const locationMapScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "locationmap",
    props: {
      title: "Office Locations",
      description: "Our global office network",
      center: { lat: 37.7749, lng: -122.4194 }, // San Francisco
      zoom: 13,
      markers: [
        {
          lat: 37.7749,
          lng: -122.4194,
          label: "Headquarters",
        },
        {
          lat: 37.7955,
          lng: -122.3937,
          label: "Research Center",
        },
        {
          lat: 37.7577,
          lng: -122.4376,
          label: "Sales Office",
        },
      ],
      interactive: true,
    },
  },
}
