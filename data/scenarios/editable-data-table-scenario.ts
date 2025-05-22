export const editableDataTableScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "editabledatatable",
    props: {
      title: "Product Catalog",
      description: "Edit product details directly in the table",
      columns: [
        { key: "name", label: "Product Name", editable: true },
        { key: "category", label: "Category", editable: true },
        { key: "price", label: "Price", editable: true },
        { key: "stock", label: "In Stock", editable: true },
      ],
      data: [
        { id: "prod-1", name: "Wireless Headphones", category: "Electronics", price: "$149.99", stock: 23 },
        { id: "prod-2", name: "Smart Watch", category: "Electronics", price: "$199.99", stock: 15 },
        { id: "prod-3", name: "Ergonomic Keyboard", category: "Computer Accessories", price: "$89.99", stock: 42 },
        { id: "prod-4", name: "Bluetooth Speaker", category: "Electronics", price: "$79.99", stock: 30 },
        { id: "prod-5", name: "Laptop Backpack", category: "Accessories", price: "$59.99", stock: 18 },
        { id: "prod-6", name: "External SSD 1TB", category: "Storage", price: "$129.99", stock: 7 },
        { id: "prod-7", name: "Wireless Mouse", category: "Computer Accessories", price: "$39.99", stock: 51 },
      ],
      pagination: true,
      pageSize: 5,
    },
  },
}
