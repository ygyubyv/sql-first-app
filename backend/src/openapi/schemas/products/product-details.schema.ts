import { ProductListItemSchema } from "./product-list-item.schema";

export const ProductDetailsSchema = {
  allOf: [
    ProductListItemSchema,
    {
      type: "object",
      properties: {
        description: {
          type: ["string", "null"],
          example: "Healthy lunch box",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-01-02T10:00:00Z",
        },
      },
    },
  ],
};
