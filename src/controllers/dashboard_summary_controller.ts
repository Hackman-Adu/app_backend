import { Request, Response } from "express";
import CustomerLoanModel from "../models/customer_loans_model";
import CustomerModel from "../models/customer_model";
import InvestmentModel from "../models/investment_model";
import InvestmentPaymemtModel from "../models/investment_payment_model";
import LoanRepaymentModel from "../models/loan_repayment_model";

const totalRepayments = async (): Promise<number> => {
  const repayments = await LoanRepaymentModel.findAll();
  const repaymentsArray = repayments.map((repayment) => {
    return repayment.amount;
  });
  if (repaymentsArray.length == 0) return 0;
  return repaymentsArray.reduce((a, b) => parseFloat((a + b).toFixed(2)));
};

const totalInvestmentPayments = async (): Promise<number> => {
  const payments = await InvestmentPaymemtModel.findAll();
  const paymentsArray = payments.map((payment) => {
    return payment.amount;
  });
  if (paymentsArray.length == 0) return 0;
  return paymentsArray.reduce((a, b) => parseFloat((a + b).toFixed(2)));
};

const totalInvestments = async (): Promise<number> => {
  const investments = await InvestmentModel.findAll();
  const investmentsArray = investments.map((investment) => {
    return investment.amount;
  });
  if (investmentsArray.length == 0) return 0;
  return investmentsArray.reduce((a, b) => parseFloat((a + b).toFixed(2)));
};

const totalLoans = async (): Promise<number> => {
  const loans = await CustomerLoanModel.findAll();
  const loansArray = loans.map((loan) => {
    return loan.amount;
  });
  if (loansArray.length == 0) return 0;
  return loansArray.reduce((a, b) => parseFloat((a + b).toFixed(2)));
};

const getSummary = async (req: Request, res: Response) => {
  try {
    const response = {
      total_customers: await CustomerModel.count(),
      total_loans: await totalLoans(),
      total_loan_repayments: await totalRepayments(),
      total_investments: await totalInvestments(),
      total_investment_payments: await totalInvestmentPayments(),
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
