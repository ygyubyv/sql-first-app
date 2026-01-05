import { OrderListItemSchema } from "../schemas/orders/order-list-item.schema";
import { OrderDetailsSchema } from "../schemas/orders/order-details.schema";
import { CreateOrderSchema } from "../schemas/orders/create-order.schema";
import { UpdateOrderSchema } from "../schemas/orders/update-order.schema";
import { errorResponse } from "../schemas/error-response.schema";

export const ordersPaths = {
  "/orders": {
    get: {
      summary: "Get all orders",
      tags: ["Orders"],
      responses: {
        200: {
          description: "List of orders",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: OrderListItemSchema,
              },
            },
          },
        },
      },
    },

    post: {
      summary: "Create order",
      tags: ["Orders"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: CreateOrderSchema,
          },
        },
      },
      responses: {
        201: {
          description: "Order created",
        },
        422: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: errorResponse("Invalid order data"),
            },
          },
        },
      },
    },
  },

  "/orders/{id}": {
    get: {
      summary: "Get order by ID",
      tags: ["Orders"],
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
          description: "Order details",
          content: {
            "application/json": {
              schema: OrderDetailsSchema,
            },
          },
        },
        404: {
          description: "Order not found",
          content: {
            "application/json": {
              schema: errorResponse("Order not found"),
            },
          },
        },
      },
    },

    put: {
      summary: "Update order",
      tags: ["Orders"],
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
            schema: UpdateOrderSchema,
          },
        },
      },
      responses: {
        200: {
          description: "Order updated",
          content: {
            "application/json": {
              schema: OrderDetailsSchema,
            },
          },
        },
        404: {
          description: "Order not found",
          content: {
            "application/json": {
              schema: errorResponse("Order not found"),
            },
          },
        },
        422: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: errorResponse("Invalid status or payment method"),
            },
          },
        },
      },
    },

    delete: {
      summary: "Delete order",
      tags: ["Orders"],
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
          description: "Order deleted",
        },
        404: {
          description: "Order not found",
          content: {
            "application/json": {
              schema: errorResponse("Order not found"),
            },
          },
        },
      },
    },
  },
};
