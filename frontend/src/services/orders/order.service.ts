import axios from "axios";
import { get_order, get_orders, update_order, delete_order } from "./api";
import type { IOrder, IOrderListItem, IUpdateOrder } from "@/types";

export const getAll = async () => {
  const response = await axios.get(get_orders);

  return response.data as IOrderListItem[];
};

export const getById = async (id: number) => {
  const response = await axios.get(get_order(id));

  return response.data as IOrder;
};

export const update = async (id: number, payload: IUpdateOrder) => {
  await axios.put(update_order(id), payload);
};

export const remove = async (id: number) => {
  await axios.delete(delete_order(id));
};
