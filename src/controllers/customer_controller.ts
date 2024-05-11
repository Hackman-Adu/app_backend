import { Request, Response } from "express";
import CustomerService from "../services/customer/customer_service";
import CustomerServiceProvider from "../services/customer/customer_service_provider";

const customerService = new CustomerService(new CustomerServiceProvider());

class CustomerController {
  public async addCustomer(req: Request, res: Response) {
    try {
      const customer = await customerService.addCustomer(req);
      res.status(200).json({ message: "Successful", data: customer });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  public async updateCustomer(req: Request, res: Response) {
    try {
      const customer = await customerService.updateCustomer(req);
      res.status(200).json({ message: "Successful", data: customer });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  public async getCustomer(req: Request, res: Response) {
    try {
      const customer = await customerService.getCustomer(req);
      res.status(200).json({ message: "Successful", data: customer });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  public async getCustomers(req: Request, res: Response) {
    try {
      const customers = await customerService.getCustomers();
      res.status(200).json({ message: "Successful", data: customers });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}

export default CustomerController;
