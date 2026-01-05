import axios from "axios";
import {
  get_customer,
  get_customers,
  create_customer,
  update_customer,
  delete_customer,
} from "./api";
import type {
  ICreateCustomer,
  ICustomer,
  ICustomerListItem,
  IUpdateCustomer,
} from "@/types";

export const getAll = async () => {
  const response = await axios.get(get_customers);

  return response.data as ICustomerListItem[];
};

export const getById = async (id: number) => {
  const response = await axios.get(get_customer(id));

  return response.data as ICustomer;
};

export const create = async (payload: ICreateCustomer) => {
  await axios.post(create_customer, payload);
};

export const update = async (id: number, payload: IUpdateCustomer) => {
  await axios.put(update_customer(id), payload);
};

export const remove = async (id: number) => {
  await axios.delete(delete_customer(id));
};
