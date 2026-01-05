export const OrderProductSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 10 },
    title: { type: "string", example: "Lunch Box" },
    imageUrl: { type: "string", example: "https://cdn.example.com/p.jpg" },
    sku: { type: ["string", "null"], example: "SKU-001" },
  },
};
