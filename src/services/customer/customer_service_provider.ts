import { Request } from "express";
import CustomerModel from "../../models/customer_model";
import CustomerPaymentMethods from "../../models/customer_payment_methods_model";
import CustomerServiceManager from "./customer_service_manager";

class CustomerServiceProvider extends CustomerServiceManager {
  async updateCustomer(request: Request): Promise<CustomerModel> {
    try {
      const customerId = request.params.id as string;
      const payload = new CustomerModel(request.body);
      const customer = await CustomerModel.findOne({
        where: { customer_id: customerId },
      });
      if (!customer) throw "Customer not found";
      const updatePayload = payload.toJSON();
      delete updatePayload.mobile;
      const data = customer.set(updatePayload);
      return await data.save();
    } catch (error) {
      throw error;
    }
  }
  async getCustomer(request: Request): Promise<CustomerModel> {
    try {
      const customerId = request.params.id as string;
      const customer = await CustomerModel.findOne({
        where: { customer_id: customerId },
        include: [
          {
            model: CustomerPaymentMethods,
          },
        ],
      });
      if (!customer) throw "Customer not found";
      return customer;
    } catch (error) {
      throw error;
    }
  }
  async getCustomers(): Promise<CustomerModel[]> {
    try {
      const customers = await CustomerModel.findAll({
        order: [["created", "DESC"]],
      });
      return customers;
    } catch (error) {
      throw error;
    }
  }
  async addCustomer(request: Request): Promise<CustomerModel> {
    try {
      const payload = new CustomerModel(request.body);
      const getCustomer = await CustomerModel.findOne({
        where: { mobile: payload.mobile },
      });
      if (getCustomer)
        throw "Customer already exists with the provided mobile number";
      const customer = await CustomerModel.create(payload.toJSON());
      return customer;
    } catch (error) {
      throw error;
    }
  }
}

export default CustomerServiceProvider;
