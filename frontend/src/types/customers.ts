import type { UserRole } from "./shared";

export interface ICustomerListItem {
  id: number;

  firstName: string;
  lastName: string;
  email: string;

  role: UserRole;
  isActive: boolean;

  createdAt: string;
}

export interface ICustomer extends ICustomerListItem {
  phone: string | null;

  lastLoginAt: string | null;
  updatedAt: string;
}

export interface ICreateCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  password: string;

  role: UserRole;
  isActive: boolean;
}

export interface IUpdateCustomer {
  firstName: string;
  lastName: string;

  role: UserRole;
  isActive: boolean;
}
