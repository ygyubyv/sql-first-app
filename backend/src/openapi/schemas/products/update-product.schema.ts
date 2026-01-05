export const UpdateProductSchema = {
  type: "object",
  required: ["title", "imageUrl", "price", "stock", "isActive"],
  properties: {
    title: { type: "string" },
    imageUrl: { type: "string" },
    sku: { type: ["string", "null"] },
    price: { type: "number" },
    stock: { type: "integer" },
    category: { type: ["string", "null"] },
    brand: { type: ["string", "null"] },
    description: { type: ["string", "null"] },
    isActive: { type: "boolean" },
  },
};
