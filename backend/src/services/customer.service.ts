import {
  ICustomer,
  ICustomerListItem,
  ICreateCustomer,
  IUpdateCustomer,
} from "../types";
import { CustomerModel } from "../models/customer";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../errors/errors";
import isEmail from "validator/lib/isEmail";
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";

export const CustomerService = {
  async getAll(): Promise<ICustomerListItem[]> {
    return CustomerModel.findAll();
  },

  async getById(id: number): Promise<ICustomer> {
    const customer = await CustomerModel.findById(id);

    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    return customer;
  },

  async create(data: ICreateCustomer): Promise<void> {
    try {
      if (!isEmail(data.email)) {
        throw new ValidationError("Invalid Email");
      }

      if (data.phone) {
        if (!isValidPhoneNumber(data.phone, "UA")) {
          throw new ValidationError("Invalid phone number");
        }

        data.phone = parsePhoneNumber(data.phone, "UA").number;
      }

      await CustomerModel.create(data);
    } catch (e: any) {
      if (e.code === "ER_DUP_ENTRY") {
        throw new ConflictError("Email already exists");
      }

      throw e;
    }
  },

  async update(id: number, data: IUpdateCustomer): Promise<ICustomer> {
    const affectedRows = await CustomerModel.update(id, data);

    if (affectedRows === 0) {
      throw new NotFoundError("Customer not found");
    }

    return CustomerModel.findById(id);
  },

  async delete(id: number): Promise<void> {
    const affectedRows = await CustomerModel.delete(id);

    if (affectedRows === 0) {
      throw new NotFoundError("Customer not found");
    }
  },
};
