import { UserRoleSchema } from "../shared/user-role.schema";

export const CreateCustomerSchema = {
  type: "object",
  required: ["firstName", "lastName", "email", "password", "role", "isActive"],
  properties: {
    firstName: { type: "string", example: "Ivan" },
    lastName: { type: "string", example: "Petrenko" },
    email: { type: "string", example: "ivan@test.com" },
    phone: { type: ["string", "null"], example: "+380501234567" },
    password: { type: "string", example: "secret123" },
    role: UserRoleSchema,
    isActive: { type: "boolean", example: true },
  },
};
