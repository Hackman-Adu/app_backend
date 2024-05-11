import { Request } from "express";
import CustomerModel from "../../models/customer_model";

abstract class CustomerServiceManager {
  abstract addCustomer(request: Request): Promise<CustomerModel>;

  abstract updateCustomer(request: Request): Promise<CustomerModel>;

  abstract getCustomer(request: Request): Promise<CustomerModel>;

  abstract getCustomers(): Promise<CustomerModel[]>;
}

export default CustomerServiceManager;
