import { Request } from "express";
import CustomerModel from "../../models/customer_model";
import CustomerPaymentMethods from "../../models/customer_payment_methods_model";
import CustomerServiceManager from "./customer_service_manager";

class CustomerServiceProvider extends CustomerServiceManager {
  async deleteCustomer(request: Request): Promise<boolean> {
    try {
      const customerId = request.params.id;
      const rows = await CustomerModel.destroy({
        where: { customer_id: customerId },
      });
      return rows > 0;
    } catch (error) {
      throw error;
    }
  }
  async updateCustomer(request: Request): Promise<CustomerModel> {
    try {
      const customerId = request.params.id as string;
      const customer = await CustomerModel.findByPk(customerId);
      if (!customer) throw "Customer not found";
      const instance = new CustomerModel(request.body);
      const payload = instance.toJSON();
      delete payload.mobile;
      delete payload.customer_id;
      const data = customer.set(payload);
      return await data.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getCustomer(request: Request): Promise<CustomerModel> {
    try {
      const customerId = request.params.id as string;
      const customer = await CustomerModel.findByPk(customerId, {
        include: [
          {
            model: CustomerPaymentMethods,
            order: [["created", "DESC"]],
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
      const customer = await CustomerModel.create(payload.toJSON());
      return customer;
    } catch (error) {
      throw error;
    }
  }
}

export default CustomerServiceProvider;
