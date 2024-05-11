import { Request, Response } from "express";
import InvestmentService from "../services/investment/investment_service";
import InvestmentServiceProvider from "../services/investment/investment_service_provider";

const investService = new InvestmentService(new InvestmentServiceProvider());

class InvestmentController {
  public async addInvestment(req: Request, res: Response) {
    try {
      const investment = await investService.addInvestment(req);
      res.status(200).json({ message: "Successful", data: investment });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }

  public async addInvestmentPayment(req: Request, res: Response) {
    try {
      const payment = await investService.addInvestmentPayment(req);
      res.status(200).json({ message: "Successful", data: payment });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }

  public async getInvestments(req: Request, res: Response) {
    try {
      const investments = await investService.getInvestments();
      res.status(200).json({ message: "Successful", data: investments });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
}

export default InvestmentController;
