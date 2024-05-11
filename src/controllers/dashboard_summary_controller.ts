import CustomerLoanModel from "../models/customer_loans_model";
import CustomerModel from "../models/customer_model";

import { Request, Response } from "express";
import InvestmentPaymemtModel from "../models/investment_payment_model";
import LoanRepaymentModel from "../models/loan_repayment_model";

const totalRepayments = async (): Promise<number> => {
  const repayments = await LoanRepaymentModel.findAll();
  const repaymentsArray = repayments.map((repayment) => {
    return repayment.amount;
  });
  return repaymentsArray.reduce((a, b) => parseFloat((a + b).toFixed(2)));
};

const totalInvestmentPayments = async (): Promise<number> => {
  const payments = await InvestmentPaymemtModel.findAll();
  const paymentsArray = payments.map((payment) => {
    return payment.amount;
  });
  return paymentsArray.reduce((a, b) => parseFloat((a + b).toFixed(2)));
};

const totalInvestments = async (): Promise<number> => {
  const investments = await LoanRepaymentModel.findAll();
  const investmentsArray = investments.map((investment) => {
    return investment.amount;
  });
  return investmentsArray.reduce((a, b) => parseFloat((a + b).toFixed(2)));
};

const totalLoans = async (): Promise<number> => {
  const loans = await CustomerLoanModel.findAll();
  const loansArray = loans.map((loan) => {
    return loan.amount;
  });
  return loansArray.reduce((a, b) => parseFloat((a + b).toFixed(2)));
};

const getSummary = async (req: Request, res: Response) => {
  try {
    const customers = CustomerModel.count();
    const loans = totalLoans();
    const repayments = totalRepayments();
    const investments = totalInvestments();
    const payments = totalInvestmentPayments();
    const value = await Promise.all([
      customers,
      loans,
      repayments,
      investments,
      payments,
    ]);
    const response = {
      total_customers: value[0],
      total_loans: value[1],
      total_loan_repayments: value[2],
      total_investments: value[3],
      total_investment_payments: value[4],
    };
    res.status(200).json({
      message: "Successful",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
};

export default getSummary;
