import { Request } from "express";
import InvestmentModel from "../../models/investment_model";
import InvestmentPaymemtModel from "../../models/investment_payment_model";

abstract class InvestmentServiceManager {
  abstract addInvestment(request: Request): Promise<InvestmentModel>;

  abstract getInvestmentById(request: Request): Promise<InvestmentModel>;

  abstract addInvestmentPayment(
    request: Request
  ): Promise<InvestmentPaymemtModel>;

  abstract getInvestments(): Promise<Array<InvestmentModel>>;

  abstract getCustomerInvestments(
    request: Request
  ): Promise<Array<InvestmentModel>>;
}

export default InvestmentServiceManager;
