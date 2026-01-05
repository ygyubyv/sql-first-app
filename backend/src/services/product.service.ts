import {
  ICreateProduct,
  IProduct,
  IProductListItem,
  IUpdateProduct,
} from "../types";
import { ProductModel } from "../models/product";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../errors/errors";

export const ProductService = {
  async getAll(): Promise<IProductListItem[]> {
    return ProductModel.findAll();
  },

  async getById(id: number): Promise<IProduct> {
    const product = await ProductModel.findById(id);

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    return product;
  },

  async create(data: ICreateProduct): Promise<void> {
    if (data.price <= 0) {
      throw new ValidationError("Price must be greater than 0");
    }

    if (data.stock < 0) {
      throw new ValidationError("Stock cannot be negative");
    }

    try {
      await ProductModel.create(data);
    } catch (e: any) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictError("SKU already exists");
      }

      throw e;
    }
  },

  async update(id: number, data: IUpdateProduct): Promise<IProduct> {
    if (data.price <= 0) {
      throw new ValidationError("Invalid price");
    }

    if (data.stock < 0) {
      throw new NotFoundError("Product not found");
    }

    const affectedRows = await ProductModel.update(id, data);

    if (affectedRows === 0) {
      throw new NotFoundError("Product not found");
    }

    return ProductModel.findById(id);
  },

  async delete(id: number): Promise<void> {
    const affectedRows = await ProductModel.delete(id);

    if (affectedRows === 0) {
      throw new NotFoundError("Product not found");
    }
  },
};
