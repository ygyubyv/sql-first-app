import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/order.service";

export const getAll = async (
  _: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderService.getAll();

    response.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = +request.params.id;

  try {
    const order = await OrderService.getById(id);

    response.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    await OrderService.create(request.body);

    response.status(201).json({
      message: "Order created",
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = +request.params.id;

  try {
    const order = await OrderService.update(id, request.body);

    response.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = +request.params.id;

  try {
    await OrderService.delete(id);

    response.status(204).send();
  } catch (error) {
    next(error);
  }
};
