import axios from "axios";
import { create_order } from "./api";
import type { ICreateOrder } from "@/types";

export const create = async (payload: ICreateOrder) => {
  await axios.post(create_order, payload);
};
