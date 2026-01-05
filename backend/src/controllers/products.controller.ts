import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";

export const getAll = async (
  _: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductService.getAll();

    response.status(200).json(products);
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
    const product = await ProductService.getById(id);

    response.status(200).json(product);
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
    await ProductService.create(request.body);

    response.status(201).json({
      message: "Product created",
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
    const product = await ProductService.update(id, request.body);

    response.status(200).json(product);
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
    await ProductService.delete(id);

    response.status(204).send();
  } catch (error) {
    next(error);
  }
};
