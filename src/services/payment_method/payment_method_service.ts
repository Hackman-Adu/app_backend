import { Request } from "express";
import CustomerPaymentMethods from "../../models/customer_payment_methods_model";
import PaymentMethodServiceManager from "./payment_method_service_manager";

class PaymentMethodService<
  T extends PaymentMethodServiceManager
> extends PaymentMethodServiceManager {
  deletePaymentMethod(request: Request): Promise<boolean> {
    return this.provider.deletePaymentMethod(request);
  }
  getPaymentMethods(): Promise<CustomerPaymentMethods[]> {
    return this.provider.getPaymentMethods();
  }
  addPaymentMethod(request: Request): Promise<CustomerPaymentMethods> {
    return this.provider.addPaymentMethod(request);
  }

  constructor(private provider: T) {
    super();
  }
}

export default PaymentMethodService;
