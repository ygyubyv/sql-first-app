import { OrderProductSchema } from "./order-product.schema";

export const OrderItemSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    price: { type: "number", example: 5.99 },
    quantity: { type: "integer", example: 2 },
    product: OrderProductSchema,
  },
};
