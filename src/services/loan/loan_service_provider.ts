import { Request } from "express";
import CustomerLoanModel from "../../models/customer_loans_model";
import CustomerModel from "../../models/customer_model";
import LoanRepaymentModel from "../../models/loan_repayment_model";
import LoanServiceManager from "./loan_service_manager";

class LoanServiceProvider extends LoanServiceManager {
  async getLoanRepayments(request: Request): Promise<LoanRepaymentModel[]> {
    try {
      const loanId = request.params.loanId;
      const loan = await CustomerLoanModel.findByPk(loanId);
      if (!loan) throw "Loan not found";
      return await LoanRepaymentModel.findAll({
        where: { loan_id: loanId },
      });
    } catch (error) {
      throw error;
    }
  }
  async addRepayment(request: Request): Promise<LoanRepaymentModel> {
    try {
      const payload = new LoanRepaymentModel(request.body);
      const loan = await CustomerLoanModel.findByPk(payload.loan_id);
      if (!loan) throw "Loan does not exist";
      const customer = await CustomerModel.findByPk(payload.customer_id);
      if (!customer) throw "Customer does not exist";
      const customerHasLoan = await CustomerLoanModel.findOne({
        where: { loan_id: payload.loan_id, customer_id: payload.customer_id },
      });
      if (!customerHasLoan) throw "Loan does not belong to customer";
      const repayment = await LoanRepaymentModel.create(payload.toJSON());
      return repayment;
    } catch (error) {
      throw error;
    }
  }
  async getCustomerLoans(request: Request): Promise<CustomerLoanModel[]> {
    const customerId = request.params.customerId;
    const customer = await CustomerModel.findByPk(customerId);
    if (!customer) throw "Customer not found";
    return await CustomerLoanModel.findAll({
      where: { customer_id: customerId },
      order: [["created", "DESC"]],
    });
  }
  async addLoan(request: Request): Promise<CustomerLoanModel> {
    try {
      const payload = new CustomerLoanModel(request.body);
      if (!(await CustomerModel.findByPk(payload.customer_id)))
        throw "Customer not found";
      const loan = await CustomerLoanModel.create(payload.toJSON());
      return loan;
    } catch (error) {
      throw error;
    }
  }
  async getLoans(): Promise<CustomerLoanModel[]> {
    return await CustomerLoanModel.findAll({
      order: [["created", "DESC"]],
      include: [
        {
          model: CustomerModel,
          attributes: ["last_name", "other_names", "mobile", "photo_url"],
        },
      ],
    });
  }
  async getLoanById(request: Request): Promise<CustomerLoanModel> {
    const loanId = request.params.loanId;
    const loan = await CustomerLoanModel.findByPk(loanId);
    if (!loan) throw "Loan not found";
    return loan;
  }
}

export default LoanServiceProvider;
