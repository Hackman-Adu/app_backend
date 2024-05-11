import { Request } from "express";
import CustomerPaymentMethods from "../../models/customer_payment_methods_model";

abstract class PaymentMethodServiceManager {
  abstract addPaymentMethod(request: Request): Promise<CustomerPaymentMethods>;

  abstract getPaymentMethods(): Promise<Array<CustomerPaymentMethods>>;
}

export default PaymentMethodServiceManager;
