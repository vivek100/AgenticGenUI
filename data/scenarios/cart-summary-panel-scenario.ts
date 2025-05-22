export const cartSummaryPanelScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "cartsummarypanel",
    props: {
      title: "Your Cart",
      description: "Review your items before checkout",
      items: [
        {
          id: "item-1",
          name: "Wireless Headphones",
          price: 249.99,
          quantity: 1,
        },
        {
          id: "item-2",
          name: "Smart Watch",
          price: 199.99,
          quantity: 1,
        },
        {
          id: "item-3",
          name: "USB-C Cable (3-pack)",
          price: 19.99,
          quantity: 2,
        },
      ],
    },
  },
}
