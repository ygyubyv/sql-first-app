export const CreateProductSchema = {
  type: "object",
  required: ["title", "imageUrl", "price", "stock", "isActive"],
  properties: {
    title: { type: "string", example: "Lunch Box" },
    imageUrl: {
      type: "string",
      example: "https://cdn.example.com/product.jpg",
    },
    sku: { type: ["string", "null"], example: "SKU-123" },
    price: { type: "number", example: 129.99 },
    stock: { type: "integer", example: 20 },
    category: { type: ["string", "null"], example: "Food" },
    brand: { type: ["string", "null"], example: "LunchCo" },
    description: { type: ["string", "null"], example: "Healthy lunch" },
    isActive: { type: "boolean", example: true },
  },
};
