export const OrderCustomerSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    firstName: { type: "string", example: "Ivan" },
    lastName: { type: "string", example: "Petrenko" },
    email: { type: "string", example: "ivan@test.com" },
  },
};
