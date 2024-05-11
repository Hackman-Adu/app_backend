import { Request } from "express";
import CustomerModel from "../../models/customer_model";
import CustomerPaymentMethods from "../../models/customer_payment_methods_model";
import PaymentMethodServiceManager from "./payment_method_service_manager";

class PaymentMethodServiceProvider extends PaymentMethodServiceManager {
  async getPaymentMethods(): Promise<CustomerPaymentMethods[]> {
    const paymentMethods = await CustomerPaymentMethods.findAll({
      include: {
        model: CustomerModel,
      },
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
    if (customer.payment_method) throw "Customer already has payment method";
    const method = await CustomerPaymentMethods.create(payload.toJSON());
    return method;
  }
}

export default PaymentMethodServiceProvider;
