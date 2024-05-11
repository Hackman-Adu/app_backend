import express from "express";
import InvestmentController from "../controllers/investment_controller";
import Middleware from "../helpers/middleware";
const router = express.Router();

const investmentController: InvestmentController = new InvestmentController();

router.post("/", Middleware.validateToken, investmentController.addInvestment);

router.get("/", Middleware.validateToken, investmentController.getInvestments);

router.post(
  "/investment-payments",
  Middleware.validateToken,
  investmentController.addInvestmentPayment
);

export default router;
