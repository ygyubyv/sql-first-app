import { API_URL } from "@/config";

export const get_products = `${API_URL}/products`;
export const get_product = (id: number) => `${API_URL}/products/${id}`;
export const create_product = `${API_URL}/products`;
export const update_product = (id: number) => `${API_URL}/products/${id}`;
export const delete_product = (id: number) => `${API_URL}/products/${id}`;
