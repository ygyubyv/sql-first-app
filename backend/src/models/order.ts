import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ICreateOrder, IOrder, IOrderListItem, IUpdateOrder } from "../types";
import database from "../utils/database";
import { ValidationError } from "../errors/errors";

export const OrderModel = {
  async findAll(): Promise<IOrderListItem[]> {
    const [rows] = await database.query<RowDataPacket[]>(
      `
        SELECT 
            o.id,
            o.status,
            o.payment_method as paymentMethod,
            o.created_at as createdAt,
            
            JSON_OBJECT(
                'id', c.id,
                'firstName', c.first_name,
                'lastName', c.last_name,
                'email', c.email
            ) AS customer
        FROM orders o
        INNER JOIN customers c
            ON o.customer_id = c.id
        `
    );

    return rows as IOrderListItem[];
  },

  async findById(id: number): Promise<IOrder | null> {
    const [rows] = await database.query<RowDataPacket[]>(
      `
        SELECT 
            o.id,
            o.status,
            o.payment_method as paymentMethod,
            o.created_at as createdAt,
            o.updated_at as updatedAt,
            
            JSON_OBJECT(
                'id', c.id,
                'firstName', c.first_name,
                'lastName', c.last_name,
                'email', c.email
            ) AS customer,
            
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'id', oi.id,
                'price', oi.price,
                'quantity', oi.quantity,
                'product', JSON_OBJECT(
                    'id', p.id,
                    'title', p.title,
                    'imageUrl', p.image_url,
                    'sku', p.sku
                    )
                )
            ) AS items
        FROM orders o
        INNER JOIN customers c
            ON o.customer_id = c.id
        INNER JOIN order_items oi
            ON o.id = oi.order_id
        INNER JOIN products p
            ON oi.product_id = p.id
        WHERE o.id = ?
        GROUP BY o.id;
        `,
      [id]
    );

    const orders = rows as IOrder[];

    return orders[0] ?? null;
  },

  async create(payload: ICreateOrder): Promise<void> {
    const productIds = payload.products.map((p) => p.id);

    const connection = await database.getConnection();

    try {
      await connection.beginTransaction();

      const [rows] = await connection.query<RowDataPacket[]>(
        `
          SELECT 
            p.id,
            p.price,
            p.stock
          FROM products p
          WHERE p.id IN (?)
          FOR UPDATE
        `,
        [productIds]
      );

      if (rows.length !== payload.products.length) {
        throw new ValidationError("Some product does not exist");
      }

      const productById = new Map<number, { price: number; stock: number }>();

      for (const row of rows) {
        productById.set(row.id, {
          price: row.price,
          stock: row.stock,
        });
      }

      let totalPrice = 0;

      for (const item of payload.products) {
        const product = productById.get(item.id);

        if (!product) {
          throw new ValidationError(`Product ${item.id} not found`);
        }

        if (item.quantity > product.stock) {
          throw new ValidationError(`Not enough stock for product ${item.id}`);
        }

        totalPrice += product.price * item.quantity;
      }

      const [orderResult] = await connection.execute<ResultSetHeader>(
        `
          INSERT INTO orders (customer_id, payment_method, total_price)
          VALUES (?, ?, ?)
        `,
        [payload.customerId, payload.paymentMethod, totalPrice]
      );

      const orderId = orderResult.insertId;

      for (const item of payload.products) {
        const product = productById.get(item.id)!;

        await connection.execute(
          `
            INSERT INTO order_items (order_id, product_id, price, quantity)
            VALUES (?, ?, ?, ?)
          `,
          [orderId, item.id, product.price, item.quantity]
        );
      }

      for (const item of payload.products) {
        await connection.execute(
          `
            UPDATE products
            SET stock = stock - ?
            WHERE id = ?
          `,
          [item.quantity, item.id]
        );
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async update(id: number, payload: IUpdateOrder): Promise<number> {
    const [result] = await database.execute<ResultSetHeader>(
      `
        UPDATE orders o
        SET 
          o.payment_method = ?,
          o.status = ?
        WHERE o.id = ?
      `,
      [payload.paymentMethod, payload.status, id]
    );

    return result.affectedRows;
  },

  async delete(id: number): Promise<number> {
    const [result] = await database.execute<ResultSetHeader>(
      `
            DELETE FROM orders o
            WHERE o.id = ?
        `,
      [id]
    );

    return result.affectedRows;
  },
};
