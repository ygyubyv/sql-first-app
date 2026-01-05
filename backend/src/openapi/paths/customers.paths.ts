import { CustomerListItemSchema } from "../schemas/customers/customer-list-item.schema";
import { CustomerDetailsSchema } from "../schemas/customers/customer-details.schema";
import { CreateCustomerSchema } from "../schemas/customers/create-customer.schema";
import { UpdateCustomerSchema } from "../schemas/customers/update-customer.schema";
import { errorResponse } from "../schemas/error-response.schema";

export const customersPaths = {
  "/customers": {
    get: {
      summary: "Get all customers",
      tags: ["Customers"],
      responses: {
        200: {
          description: "List of customers",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: CustomerListItemSchema,
              },
            },
          },
        },
      },
    },

    post: {
      summary: "Create customer",
      tags: ["Customers"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: CreateCustomerSchema,
          },
        },
      },
      responses: {
        201: {
          description: "Customer created",
        },
        422: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: errorResponse("Invalid email or phone number"),
            },
          },
        },
        409: {
          description: "Conflict",
          content: {
            "application/json": {
              schema: errorResponse("Email already exists"),
            },
          },
        },
      },
    },
  },

  "/customers/{id}": {
    get: {
      summary: "Get customer by ID",
      tags: ["Customers"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        200: {
          description: "Customer details",
          content: {
            "application/json": {
              schema: CustomerDetailsSchema,
            },
          },
        },
        404: {
          description: "Customer not found",
          content: {
            "application/json": {
              schema: errorResponse("Customer not found"),
            },
          },
        },
      },
    },

    put: {
      summary: "Update customer",
      tags: ["Customers"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: UpdateCustomerSchema,
          },
        },
      },
      responses: {
        200: {
          description: "Customer updated",
          content: {
            "application/json": {
              schema: CustomerDetailsSchema,
            },
          },
        },
        404: {
          description: "Customer not found",
          content: {
            "application/json": {
              schema: errorResponse("Customer not found"),
            },
          },
        },
      },
    },

    delete: {
      summary: "Delete customer",
      tags: ["Customers"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "integer" },
        },
      ],
      responses: {
        204: {
          description: "Customer deleted",
        },
        404: {
          description: "Customer not found",
          content: {
            "application/json": {
              schema: errorResponse("Customer not found"),
            },
          },
        },
      },
    },
  },
};
