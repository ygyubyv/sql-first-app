import { UserRoleSchema } from "../shared/user-role.schema";

export const CustomerListItemSchema = {
  type: "object",
  properties: {
    id: { type: "integer", example: 1 },
    firstName: { type: "string", example: "Ivan" },
    lastName: { type: "string", example: "Petrenko" },
    email: { type: "string", example: "ivan@test.com" },
    role: UserRoleSchema,
    isActive: { type: "boolean", example: true },
    createdAt: {
      type: "string",
      format: "date-time",
      example: "2025-01-01T12:00:00Z",
    },
  },
};
