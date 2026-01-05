import axios from "axios";
import {
  get_products,
  get_product,
  create_product,
  update_product,
  delete_product,
} from "./api";
import type { ICreateProduct, IProductListItem, IUpdateProduct } from "@/types";

export const getAll = async () => {
  const response = await axios.get(get_products);

  return response.data as IProductListItem[];
};

export const getById = async (id: number) => {
  const response = await axios.get(get_product(id));

  return response.data;
};

export const create = async (payload: ICreateProduct) => {
  await axios.post(create_product, payload);
};

export const update = async (id: number, payload: IUpdateProduct) => {
  await axios.put(update_product(id), payload);
};

export const remove = async (id: number) => {
  await axios.delete(delete_product(id));
};
