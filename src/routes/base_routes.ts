import express from "express";
import getSummary from "../controllers/dashboard_summary_controller";
import Middleware from "../helpers/middleware";
import AuthRoutes from "../routes/auth_routes";
import CustomerRoutes from "../routes/customer_routes";
import InvestmentRoutes from "../routes/investment_routes";
import LoanRoutes from "../routes/loan_routes";
import PaymentMethodRoutes from "../routes/payment_method_routes";

const router = express.Router();

router.use("/auth", AuthRoutes);

router.use("/customers", Middleware.validateRequest, CustomerRoutes);

router.get("/dasboard", Middleware.validateRequest, getSummary);

router.use("/loans", Middleware.validateRequest, LoanRoutes);

router.use("/investments", Middleware.validateRequest, InvestmentRoutes);

router.use("/payment-methods", Middleware.validateRequest, PaymentMethodRoutes);

export default router;
