import express from "express";
import PaymentMethodController from "../controllers/payment_method_controller";
const router = express.Router();

const paymentMethodController: PaymentMethodController =
  new PaymentMethodController();

router.post("/", paymentMethodController.addPaymentMethod);

router.get("/", paymentMethodController.getPaymentMethods);

router.delete("/:id", paymentMethodController.deletePaymentMethod);

export default router;
