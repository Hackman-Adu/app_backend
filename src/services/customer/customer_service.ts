import { Request } from "express";
import CustomerModel from "../../models/customer_model";
import CustomerServiceManager from "./customer_service_manager";

class CustomerService<
  T extends CustomerServiceManager
> extends CustomerServiceManager {
  deleteCustomer(request: Request): Promise<boolean> {
    return this.provider.deleteCustomer(request);
  }
  updateCustomer(request: Request): Promise<CustomerModel> {
    return this.provider.updateCustomer(request);
  }
  constructor(private provider: T) {
    super();
  }
  getCustomer(request: Request): Promise<CustomerModel> {
    return this.provider.getCustomer(request);
  }
  getCustomers(): Promise<CustomerModel[]> {
    return this.provider.getCustomers();
  }

  addCustomer(request: Request): Promise<CustomerModel> {
    return this.provider.addCustomer(request);
  }
}

export default CustomerService;
