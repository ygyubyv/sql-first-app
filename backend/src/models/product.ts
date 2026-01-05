import { ResultSetHeader, RowDataPacket } from "mysql2";
import {
  IProductListItem,
  ICreateProduct,
  IProduct,
  IUpdateProduct,
} from "../types";
import database from "../utils/database";

export const ProductModel = {
  async findAll(): Promise<IProductListItem[]> {
    const [rows] = await database.query<RowDataPacket[]>(
      `
        SELECT 
            p.id, 
            p.title, 
            p.image_url as imageUrl, 
            p.price, 
            p.stock, 
            p.sku, 
            p.is_active as isActive, 
            p.category, 
            p.brand,
            p.created_at as createdAt
        FROM products p
    `
    );

    return rows.map((row) => ({
      ...row,
      isActive: Boolean(row.isActive),
    })) as IProductListItem[];
  },

  async findById(id: number): Promise<IProduct | null> {
    const [rows] = await database.query<RowDataPacket[]>(
      `
        SELECT 
            p.id, 
            p.title, 
            p.image_url as imageUrl, 
            p.price, 
            p.stock, 
            p.sku, 
            p.is_active as isActive, 
            p.category, 
            p.brand,
            p.description,
            p.created_at as createdAt,
            p.updated_at as updatedAt
        FROM products p
        WHERE p.id = ?
    `,
      [id]
    );

    const products = rows.map((row) => ({
      ...row,
      isActive: Boolean(row.isActive),
    })) as IProduct[];

    return products[0] ?? null;
  },

  async create(payload: ICreateProduct): Promise<void> {
    await database.execute<ResultSetHeader>(
      `
        INSERT INTO products (title, image_url, price, stock, sku, is_active, category, brand, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        payload.title,
        payload.imageUrl,
        payload.price,
        payload.stock,
        payload.sku,
        payload.isActive,
        payload.category,
        payload.brand,
        payload.description,
      ]
    );
  },

  async update(id: number, payload: IUpdateProduct): Promise<number> {
    const [result] = await database.execute<ResultSetHeader>(
      `
        UPDATE products
        SET 
            title = ?,
            image_url = ?,
            price = ?,
            stock = ?,
            sku = ?,
            is_active = ?,
            category = ?,
            brand = ?,
            description = ?
        WHERE products.id = ?
    `,
      [
        payload.title,
        payload.imageUrl,
        payload.price,
        payload.stock,
        payload.sku,
        payload.isActive,
        payload.category,
        payload.brand,
        payload.description,
        id,
      ]
    );

    return result.affectedRows;
  },

  async delete(id: number): Promise<number> {
    const [result] = await database.execute<ResultSetHeader>(
      `
        DELETE FROM products
        WHERE products.id = ?
    `,
      [id]
    );

    return result.affectedRows;
  },
};
