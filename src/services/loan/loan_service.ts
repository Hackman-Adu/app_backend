import { Request } from "express";
import CustomerLoanModel from "../../models/customer_loans_model";
import LoanRepaymentModel from "../../models/loan_repayment_model";
import LoanServiceManager from "./loan_service_manager";

class LoanService<T extends LoanServiceManager> extends LoanServiceManager {
  getLoanRepayments(request: Request): Promise<LoanRepaymentModel[]> {
    return this.provider.getLoanRepayments(request);
  }
  addRepayment(request: Request): Promise<LoanRepaymentModel> {
    return this.provider.addRepayment(request);
  }
  addLoan(request: Request): Promise<CustomerLoanModel> {
    return this.provider.addLoan(request);
  }
  getLoans(): Promise<CustomerLoanModel[]> {
    return this.provider.getLoans();
  }
  getCustomerLoans(request: Request): Promise<CustomerLoanModel[]> {
    return this.provider.getCustomerLoans(request);
  }
  getLoanById(request: Request): Promise<CustomerLoanModel> {
    return this.provider.getLoanById(request);
  }
  constructor(public provider: T) {
    super();
  }
}

export default LoanService;
