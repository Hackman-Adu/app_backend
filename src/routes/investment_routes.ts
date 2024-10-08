import express from "express";
import InvestmentController from "../controllers/investment_controller";
const router = express.Router();

const investmentController: InvestmentController = new InvestmentController();

router.post("/", investmentController.addInvestment);

router.get("/", investmentController.getInvestments);

router.get("/:id", investmentController.getInvestmentById);

router.get("/customer/:id", investmentController.getCustomerInvestments);

router.post("/investment-payments", investmentController.addInvestmentPayment);

export default router;
