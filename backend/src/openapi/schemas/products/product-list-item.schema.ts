export const ProductListItemSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },
    title: {
      type: "string",
      example: "Lunch Box",
    },
    imageUrl: {
      type: "string",
      example: "https://cdn.example.com/product.jpg",
    },
    price: {
      type: "number",
      example: 129.99,
    },
    stock: {
      type: "integer",
      example: 20,
    },
    sku: {
      type: ["string", "null"],
      example: "SKU-123",
    },
    isActive: {
      type: "boolean",
      example: true,
    },
    category: {
      type: ["string", "null"],
      example: "Food",
    },
    brand: {
      type: ["string", "null"],
      example: "LunchCo",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      example: "2025-01-01T12:00:00Z",
    },
  },
};
