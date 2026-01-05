import { CustomerListItemSchema } from "./customer-list-item.schema";

export const CustomerDetailsSchema = {
  allOf: [
    CustomerListItemSchema,
    {
      type: "object",
      properties: {
        phone: {
          type: ["string", "null"],
          example: "+380501234567",
        },
        lastLoginAt: {
          type: ["string", "null"],
          format: "date-time",
          example: "2025-01-10T09:30:00Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-01-10T09:00:00Z",
        },
      },
    },
  ],
};
