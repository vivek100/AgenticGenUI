export const searchWithFiltersScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "searchwithfilters",
    props: {
      title: "Search Products",
      description: "Find products by name or apply filters",
      placeholder: "Search products...",
      filters: [
        { id: "category-electronics", label: "Electronics", value: "electronics" },
        { id: "category-clothing", label: "Clothing", value: "clothing" },
        { id: "category-books", label: "Books", value: "books" },
        { id: "price-low", label: "Under $50", value: "price_under_50" },
        { id: "price-mid", label: "$50 - $100", value: "price_50_100" },
        { id: "price-high", label: "Over $100", value: "price_over_100" },
        { id: "rating-high", label: "4+ Stars", value: "rating_4plus", active: true },
      ],
    },
  },
}
