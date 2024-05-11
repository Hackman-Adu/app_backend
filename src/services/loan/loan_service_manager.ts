import { Request } from "express";
import CustomerLoanModel from "../../models/customer_loans_model";
import LoanRepaymentModel from "../../models/loan_repayment_model";

abstract class LoanServiceManager {
  abstract addLoan(request: Request): Promise<CustomerLoanModel>;

  abstract addRepayment(request: Request): Promise<LoanRepaymentModel>;

  abstract getLoanRepayments(
    request: Request
  ): Promise<Array<LoanRepaymentModel>>;

  abstract getLoans(): Promise<CustomerLoanModel[]>;

  abstract getCustomerLoans(request: Request): Promise<CustomerLoanModel[]>;

  abstract getLoanById(request: Request): Promise<CustomerLoanModel>;
}

export default LoanServiceManager;
