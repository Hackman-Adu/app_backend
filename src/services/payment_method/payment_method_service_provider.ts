import { Request } from "express";
import CustomerModel from "../../models/customer_model";
import CustomerPaymentMethods from "../../models/customer_payment_methods_model";
import PaymentMethodServiceManager from "./payment_method_service_manager";

class PaymentMethodServiceProvider extends PaymentMethodServiceManager {
  async deletePaymentMethod(request: Request): Promise<boolean> {
    const methodId = request.params.id as string;
    const rows = await CustomerPaymentMethods.destroy({
      where: { method_id: methodId },
    });
    return rows > 0;
  }
  async getPaymentMethods(): Promise<CustomerPaymentMethods[]> {
    const paymentMethods = await CustomerPaymentMethods.findAll({
      include: {
        model: CustomerModel,
        attributes: ["last_name", "other_names", "mobile", "photo_url"],
      },
      order: [["created", "DESC"]],
    });
    return paymentMethods;
  }
  async addPaymentMethod(request: Request): Promise<CustomerPaymentMethods> {
    const payload = new CustomerPaymentMethods(request.body);
    const customer = await CustomerModel.findByPk(payload.customer_id, {
      include: {
        model: CustomerPaymentMethods,
      },
    });
    if (!customer) throw "Customer does not exist";
    if (customer.payment_methods?.length == 2)
      throw "Customer already has 2 payment methods";
    const methodExist = await CustomerPaymentMethods.findOne({
      where: { details: payload.details },
    });
    if (methodExist)
      throw "Payment method details already exist for a customer";
    return await CustomerPaymentMethods.create(payload.toJSON());
  }
}

export default PaymentMethodServiceProvider;
