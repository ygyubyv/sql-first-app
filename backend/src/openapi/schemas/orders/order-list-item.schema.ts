import { OrderCustomerSchema } from "./order-customer.schema";
import { OrderStatusSchema } from "./order-status.schema";
import { PaymentMethodSchema } from "./payment-method.schema";

export const OrderListItemSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    customer: OrderCustomerSchema,
    status: OrderStatusSchema,
    paymentMethod: PaymentMethodSchema,
    createdAt: {
      type: "string",
      format: "date-time",
      example: "2025-01-01T12:00:00Z",
    },
  },
};
