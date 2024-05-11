import { Request, Response } from "express";
import PaymentMethodService from "../services/payment_method/payment_method_service";
import PaymentMethodServiceProvider from "../services/payment_method/payment_method_service_provider";

const paymentMethodService = new PaymentMethodService(
  new PaymentMethodServiceProvider()
);

class PaymentMethodController {
  public async addPaymentMethod(req: Request, res: Response) {
    try {
      const paymentMethod = await paymentMethodService.addPaymentMethod(req);
      res.status(200).json({ message: "Successful", data: paymentMethod });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }

  public async getPaymentMethods(req: Request, res: Response) {
    try {
      const paymentMethods = await paymentMethodService.getPaymentMethods();
      res.status(200).json({ message: "Successful", data: paymentMethods });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
}

export default PaymentMethodController;
