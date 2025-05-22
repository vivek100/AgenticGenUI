export const orderStatusTrackerScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "orderstatustracker",
    props: {
      title: "Order #12345",
      description: "Placed on May 10, 2023",
      status: "shipping",
      steps: [
        {
          id: "order",
          label: "Order Placed",
          description: "Your order has been received",
          date: "May 10, 2023",
          icon: "order",
        },
        {
          id: "processing",
          label: "Processing",
          description: "Your order is being prepared",
          date: "May 11, 2023",
          icon: "processing",
        },
        {
          id: "shipping",
          label: "Shipped",
          description: "Your order is on the way",
          date: "May 12, 2023",
          icon: "shipping",
        },
        {
          id: "delivered",
          label: "Delivered",
          description: "Expected delivery",
          date: "May 15, 2023",
          icon: "delivered",
        },
      ],
    },
  },
}
