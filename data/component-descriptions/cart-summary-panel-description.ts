export const cartSummaryPanelDescription = {
  description: "Displays and manages shopping cart items",
  props: [
    { name: "title", type: "string", description: "Cart title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "items", type: "Array<CartItem>", description: "Cart items to display" },
    { name: "currency", type: "string", description: "Currency code for prices" },
  ],
  events: [],
  toolCalls: [
    {
      name: "updateCartItem",
      description: "Called when item quantity is changed",
      args: "{ itemId: string, quantity: number }",
    },
    {
      name: "removeCartItem",
      description: "Called when item is removed",
      args: "{ itemId: string }",
    },
    {
      name: "checkoutCart",
      description: "Called when checkout button is clicked",
      args: "{ items: Array<CartItem>, promoCode?: string, total: number }",
    },
  ],
}
