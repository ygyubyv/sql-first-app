import {
  ICreateOrder,
  IOrder,
  IOrderListItem,
  IUpdateOrder,
  OrderStatus,
  PaymentMethod,
} from "../types";
import { OrderModel } from "../models/order";
import { NotFoundError, ValidationError } from "../errors/errors";

export const OrderService = {
  async getAll(): Promise<IOrderListItem[]> {
    return OrderModel.findAll();
  },

  async getById(id: number): Promise<IOrder> {
    const product = await OrderModel.findById(id);

    if (!product) {
      throw new NotFoundError("Order not found");
    }

    return product;
  },

  async create(data: ICreateOrder): Promise<void> {
    if (!data.products.length) {
      throw new ValidationError("At least one product is required");
    }

    const validateProductsQuantity = data.products.every((product) => {
      return product.quantity >= 1;
    });

    if (!validateProductsQuantity) {
      throw new ValidationError("Products quantity must be >= 1");
    }

    try {
      await OrderModel.create(data);
    } catch (e: any) {
      throw e;
    }
  },

  async update(id: number, data: IUpdateOrder): Promise<IOrder> {
    if (!(data.status in OrderStatus)) {
      throw new ValidationError("Invalid status");
    }

    if (!(data.paymentMethod in PaymentMethod)) {
      throw new ValidationError("Invalid payment method");
    }

    const affectedRows = await OrderModel.update(id, data);

    if (affectedRows === 0) {
      throw new NotFoundError("Order not found");
    }

    return OrderModel.findById(id);
  },

  async delete(id: number): Promise<void> {
    const affectedRows = await OrderModel.delete(id);

    if (affectedRows === 0) {
      throw new NotFoundError("Order not found");
    }
  },
};
