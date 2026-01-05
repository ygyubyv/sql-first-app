import { API_URL } from "@/config";

export const get_customers = `${API_URL}/customers`;
export const get_customer = (id: number) => `${API_URL}/customers/${id}`;
export const create_customer = `${API_URL}/customers`;
export const update_customer = (id: number) => `${API_URL}/customers/${id}`;
export const delete_customer = (id: number) => `${API_URL}/customers/${id}`;
