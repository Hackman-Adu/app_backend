import CustomerLoanModel from "../models/customer_loans_model";
import CustomerModel from "../models/customer_model";
import CustomerPaymentMethods from "../models/customer_payment_methods_model";
import InvestmentModel from "../models/investment_model";
import InvestmentPaymemtModel from "../models/investment_payment_model";
import LoanRepaymentModel from "../models/loan_repayment_model";
import UserModel from "../models/user_model";

export const dbTables = [
  CustomerModel,
  CustomerPaymentMethods,
  CustomerLoanModel,
  UserModel,
  LoanRepaymentModel,
  InvestmentModel,
  InvestmentPaymemtModel,
];
