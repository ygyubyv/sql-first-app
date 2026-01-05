import { OrderListItemSchema } from "./order-list-item.schema";
import { OrderItemSchema } from "./order-item.schema";

export const OrderDetailsSchema = {
  allOf: [
    OrderListItemSchema,
    {
      type: "object",
      properties: {
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-01-01T12:30:00Z",
        },
        items: {
          type: "array",
          items: OrderItemSchema,
        },
      },
    },
  ],
};
