import { Request, Response, NextFunction } from "express";
import { CustomerService } from "../services/customer.service";

export const getAll = async (
  _: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const customers = await CustomerService.getAll();

    response.status(200).json(customers);
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
    const customer = await CustomerService.getById(id);

    response.status(200).json(customer);
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
    await CustomerService.create(request.body);

    response.status(201).json({
      message: "Customer created",
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
    const customer = await CustomerService.update(id, request.body);

    response.status(200).json(customer);
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
    await CustomerService.delete(id);

    response.status(204).send();
  } catch (error) {
    next(error);
  }
};
