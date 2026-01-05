export const OrderStatusSchema = {
  type: "string",
  enum: ["pending", "paid", "cancelled", "completed"],
  example: "pending",
};
