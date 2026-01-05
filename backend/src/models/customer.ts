import { ResultSetHeader, RowDataPacket } from "mysql2";
import {
  ICustomer,
  ICustomerListItem,
  ICreateCustomer,
  IUpdateCustomer,
} from "../types";
import database from "../utils/database";

export const CustomerModel = {
  async findAll(): Promise<ICustomerListItem[]> {
    const [rows] = await database.query<RowDataPacket[]>(
      `
        SELECT 
            c.id, 
            c.first_name as firstName,
            c.last_name as lastName,
            c.email,
            c.role,
            c.is_active as isActive,
            c.created_at as createdAt
        FROM customers c
    `
    );

    return rows.map((row) => ({
      ...row,
      isActive: Boolean(row.isActive),
    })) as ICustomerListItem[];
  },

  async findById(id: number): Promise<ICustomer | null> {
    const [rows] = await database.query<RowDataPacket[]>(
      `
       SELECT 
            c.id, 
            c.first_name as firstName,
            c.last_name as lastName,
            c.email,
            c.role,
            c.phone,
            c.last_login_at as lastLoginAt,
            c.updated_at as updatedAt,
            c.is_active as isActive,
            c.created_at as createdAt
        FROM customers c
        WHERE c.id = ?
    `,
      [id]
    );

    const customers = rows.map((row) => ({
      ...row,
      isActive: Boolean(row.isActive),
    })) as ICustomer[];

    return customers[0] ?? null;
  },

  async create(payload: ICreateCustomer): Promise<void> {
    await database.execute<ResultSetHeader>(
      `
        INSERT INTO customers (first_name, last_name, email, password, phone, role, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [
        payload.firstName,
        payload.lastName,
        payload.email,
        payload.password,
        payload.phone,
        payload.role,
        payload.isActive,
      ]
    );
  },

  async update(id: number, payload: IUpdateCustomer): Promise<number> {
    const [result] = await database.execute<ResultSetHeader>(
      `
        UPDATE customers
        SET 
            first_name = ?,
            last_name = ?,
            role = ?,
            is_active = ?
        WHERE customers.id = ?
    `,
      [payload.firstName, payload.lastName, payload.role, payload.isActive, id]
    );

    return result.affectedRows;
  },

  async delete(id: number): Promise<number> {
    const [result] = await database.execute<ResultSetHeader>(
      `
        DELETE FROM customers
        WHERE customers.id = ?
    `,
      [id]
    );

    return result.affectedRows;
  },
};
