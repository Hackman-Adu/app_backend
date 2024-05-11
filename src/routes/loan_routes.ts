import express from "express";
import LoanController from "../controllers/loan_controller";

const router = express.Router();

const loanController: LoanController = new LoanController();

router.get("", loanController.getLoans);

router.post("", loanController.addLoan);

router.post("/repayments", loanController.addLoanRepayment);

router.get("/repayments/:loanId", loanController.getLoanRepayments);

router.get("/customer/:customerId", loanController.getCustomerLoans);

router.get("/:loanId", loanController.getLoanById);

export default router;
