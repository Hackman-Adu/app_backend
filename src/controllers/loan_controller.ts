import { Request, Response } from "express";
import LoanService from "../services/loan/loan_service";
import LoanServiceProvider from "../services/loan/loan_service_provider";

const loanService = new LoanService(new LoanServiceProvider());

class LoanController {
  public async getLoans(req: Request, res: Response) {
    try {
      const loans = await loanService.getLoans();
      res.status(200).json({ message: "Successful", data: loans });
    } catch (error) {
      console.log("ERROR HERE", error);
      res.status(403).json({ message: error });
    }
  }

  public async getLoanRepayments(req: Request, res: Response) {
    try {
      const repayments = await loanService.getLoanRepayments(req);
      res.status(200).json({ message: "Successful", data: repayments });
    } catch (error) {
      console.log("ERROR HERE", error);
      res.status(403).json({ message: error });
    }
  }

  public async getLoanById(req: Request, res: Response) {
    try {
      const loan = await loanService.getLoanById(req);
      res.status(200).json({ message: "Successful", data: loan });
    } catch (error) {
      res.status(403).json({ message: error });
    }
  }

  public async getCustomerLoans(req: Request, res: Response) {
    try {
      const loan = await loanService.getCustomerLoans(req);
      res.status(200).json({ message: "Successful", data: loan });
    } catch (error) {
      res.status(403).json({ message: error });
    }
  }

  public async addLoan(req: Request, res: Response) {
    try {
      const loan = await loanService.addLoan(req);
      res.status(200).json({ message: "Successful", data: loan });
    } catch (error) {
      res.status(403).json({ message: error });
    }
  }

  public async addLoanRepayment(req: Request, res: Response) {
    try {
      const repayment = await loanService.addRepayment(req);
      res.status(200).json({ message: "Successful", data: repayment });
    } catch (error) {
      res.status(403).json({ message: error });
    }
  }
}

export default LoanController;
