import express from "express";
import PaymentMethodController from "../controllers/payment_method_controller";
const router = express.Router();

const paymentMethodController: PaymentMethodController =
  new PaymentMethodController();

router.post("/", paymentMethodController.addPaymentMethod);

router.get("/", paymentMethodController.getPaymentMethods);

export default router;
