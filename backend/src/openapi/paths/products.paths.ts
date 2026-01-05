import { ProductListItemSchema } from "../schemas/products/product-list-item.schema";
import { ProductDetailsSchema } from "../schemas/products/product-details.schema";
import { CreateProductSchema } from "../schemas/products/create-product.schema";
import { UpdateProductSchema } from "../schemas/products/update-product.schema";
import { errorResponse } from "../schemas/error-response.schema";

export const productsPaths = {
  "/products": {
    get: {
      summary: "Get all products",
      tags: ["Products"],
      responses: {
        200: {
          description: "List of products",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: ProductListItemSchema,
              },
            },
          },
        },
      },
    },

    post: {
      summary: "Create product",
      tags: ["Products"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: CreateProductSchema,
          },
        },
      },
      responses: {
        201: {
          description: "Created",
        },
        422: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: errorResponse("Price must be greater than 0"),
            },
          },
        },
        409: {
          description: "Conflict",
          content: {
            "application/json": {
              schema: errorResponse("SKU already exists"),
            },
          },
        },
      },
    },
  },

  "/products/{id}": {
    get: {
      summary: "Get product by ID",
      tags: ["Products"],
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
          description: "Product details",
          content: {
            "application/json": {
              schema: ProductDetailsSchema,
            },
          },
        },
        404: {
          description: "Product not found",
          content: {
            "application/json": {
              schema: errorResponse("Product not found"),
            },
          },
        },
      },
    },

    put: {
      summary: "Update product",
      tags: ["Products"],
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
            schema: UpdateProductSchema,
          },
        },
      },
      responses: {
        200: {
          description: "Product updated",
          content: {
            "application/json": {
              schema: ProductDetailsSchema,
            },
          },
        },
        404: {
          description: "Product not found",
          content: {
            "application/json": {
              schema: errorResponse("Product not found"),
            },
          },
        },
        422: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: errorResponse("Price must be greater than 0"),
            },
          },
        },
      },
    },

    delete: {
      summary: "Delete product",
      tags: ["Products"],
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
          description: "Deleted",
        },
        404: {
          description: "Product not found",
          content: {
            "application/json": {
              schema: errorResponse("Product not found"),
            },
          },
        },
      },
    },
  },
};
