import { API_URL } from "@/config";

export const get_orders = `${API_URL}/orders`;
export const get_order = (id: number) => `${API_URL}/orders/${id}`;
export const update_order = (id: number) => `${API_URL}/orders/${id}`;
export const delete_order = (id: number) => `${API_URL}/orders/${id}`;
