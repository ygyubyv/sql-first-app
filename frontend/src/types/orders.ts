export const OrderStatus = {
  pending: "pending",
  paid: "paid",
  cancelled: "cancelled",
  completed: "completed",
};

export const PaymentMethod = {
  card: "card",
  cash: "cash",
  transfer: "transfer",
};

export type OrderStatusKeys = keyof typeof OrderStatus;
export type PaymentMethodKeys = keyof typeof PaymentMethod;

export interface IOrderCustomer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IOrderProduct {
  id: number;
  title: string;
  sku: string | null;
  imageUrl: string;
}

export interface IOrderItem {
  id: number;
  product: IOrderProduct;
  price: number;
  quantity: number;
}

export interface IOrderListItem {
  id: number;
  customer: IOrderCustomer;
  status: OrderStatusKeys;
  paymentMethod: PaymentMethodKeys;
  createdAt: string;
}

export interface IOrder extends IOrderListItem {
  updatedAt: string;
  items: IOrderItem[];
}

export interface ICreateOrder {
  customerId: number;
  paymentMethod: PaymentMethodKeys;
  products: {
    id: number;
    quantity: number;
  }[];
}

export interface IUpdateOrder {
  status: OrderStatusKeys;
  paymentMethod: PaymentMethodKeys;
}
