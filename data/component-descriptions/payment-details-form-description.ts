export const paymentDetailsFormDescription = {
  description: "Collects payment details",
  props: [
    { name: "title", type: "string", description: "Form title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "amount", type: "number", description: "Payment amount" },
    { name: "currency", type: "string", description: "Currency code" },
  ],
  events: [],
  toolCalls: [
    {
      name: "processPayment",
      description: "Called when payment is submitted",
      args: "{ amount: number, currency: string, last4: string }",
    },
  ],
}
