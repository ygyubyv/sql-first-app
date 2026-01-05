import { PaymentMethodSchema } from "./payment-method.schema";

export const CreateOrderSchema = {
  type: "object",
  required: ["customerId", "paymentMethod", "products"],
  properties: {
    customerId: { type: "integer", example: 1 },
    paymentMethod: PaymentMethodSchema,
    products: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["id", "quantity"],
        properties: {
          id: { type: "integer", example: 10 },
          quantity: { type: "integer", example: 2, minimum: 1 },
        },
      },
    },
  },
};
