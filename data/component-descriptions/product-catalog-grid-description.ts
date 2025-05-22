export const productCatalogGridDescription = {
  description: "Displays a grid of product cards",
  props: [
    { name: "title", type: "string", description: "Grid title" },
    { name: "description", type: "string", description: "Optional description" },
    { name: "products", type: "Array<Product>", description: "Products to display" },
    { name: "currency", type: "string", description: "Currency code for prices" },
  ],
  events: [],
  toolCalls: [
    {
      name: "selectProduct",
      description: "Called when a product is selected",
      args: "{ productId: string }",
    },
  ],
}
