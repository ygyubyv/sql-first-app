import { productsPaths } from "./paths/products.paths";
import { customersPaths } from "./paths/customers.paths";
import { ordersPaths } from "./paths/orders.paths";

export const openapiDefinition = {
  openapi: "3.0.3",
  info: {
    title: "Mini OMS API",
    version: "1.0.0",
  },
  paths: {
    ...productsPaths,
    ...customersPaths,
    ...ordersPaths,
  },
};
