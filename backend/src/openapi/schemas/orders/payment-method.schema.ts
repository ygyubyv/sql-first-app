export const PaymentMethodSchema = {
  type: "string",
  enum: ["card", "cash", "transfer"],
  example: "card",
};
