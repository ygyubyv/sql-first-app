import { UserRoleSchema } from "../shared/user-role.schema";

export const UpdateCustomerSchema = {
  type: "object",
  required: ["firstName", "lastName", "role", "isActive"],
  properties: {
    firstName: { type: "string", example: "Ivan" },
    lastName: { type: "string", example: "Petrenko" },
    role: UserRoleSchema,
    isActive: { type: "boolean", example: true },
  },
};
