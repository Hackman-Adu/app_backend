import { Request } from "express";
import InvestmentModel from "../../models/investment_model";
import InvestmentPaymemtModel from "../../models/investment_payment_model";
import InvestmentServiceManager from "./investment_service_manager";

class InvestmentService<
  T extends InvestmentServiceManager
> extends InvestmentServiceManager {
  getCustomerInvestments(request: Request): Promise<InvestmentModel[]> {
    return this.provider.getCustomerInvestments(request);
  }
  getInvestmentById(request: Request): Promise<InvestmentModel> {
    return this.provider.getInvestmentById(request);
  }
  addInvestmentPayment(request: Request): Promise<InvestmentPaymemtModel> {
    return this.provider.addInvestmentPayment(request);
  }
  addInvestment(request: Request): Promise<InvestmentModel> {
    return this.provider.addInvestment(request);
  }
  getInvestments(): Promise<InvestmentModel[]> {
    return this.provider.getInvestments();
  }
  constructor(private provider: T) {
    super();
  }
}

export default InvestmentService;
