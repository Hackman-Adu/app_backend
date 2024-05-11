import express from "express";
import PaymentMethodController from "../controllers/payment_method_controller";
import Middleware from "../helpers/middleware";
const router = express.Router();

const paymentMethodController: PaymentMethodController =
  new PaymentMethodController();

router.post(
  "/",
  Middleware.validateToken,
  paymentMethodController.addPaymentMethod
);

router.get(
  "/",
  Middleware.validateToken,
  paymentMethodController.getPaymentMethods
);

export default router;
