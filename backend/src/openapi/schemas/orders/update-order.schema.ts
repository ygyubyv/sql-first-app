import { OrderStatusSchema } from "./order-status.schema";
import { PaymentMethodSchema } from "./payment-method.schema";

export const UpdateOrderSchema = {
  type: "object",
  required: ["status", "paymentMethod"],
  properties: {
    status: OrderStatusSchema,
    paymentMethod: PaymentMethodSchema,
  },
};
