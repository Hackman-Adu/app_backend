import { Request } from "express";
import CustomerModel from "../../models/customer_model";
import CustomerPaymentMethods from "../../models/customer_payment_methods_model";
import InvestmentModel from "../../models/investment_model";
import InvestmentPaymemtModel from "../../models/investment_payment_model";
import InvestmentServiceManager from "./investment_service_manager";

class InvestmentServiceProvider extends InvestmentServiceManager {
  async addInvestmentPayment(
    request: Request
  ): Promise<InvestmentPaymemtModel> {
    try {
      const payload = new InvestmentPaymemtModel(request.body);
      const investment = await InvestmentModel.findByPk(payload.investment_id);
      if (!investment) throw "Investment does not exist";
      const customer = await CustomerModel.findByPk(payload.customer_id);
      if (!customer) throw "Customer does not exist";
      const customerHasInvestment = await InvestmentModel.findOne({
        where: {
          investment_id: payload.investment_id,
          customer_id: payload.customer_id,
        },
      });
      if (!customerHasInvestment)
        throw "Investment does not belong to customer";
      const payment = await InvestmentPaymemtModel.create(payload.toJSON());
      return payment;
    } catch (error) {
      throw error;
    }
  }
  async addInvestment(request: Request): Promise<InvestmentModel> {
    try {
      const payload = new InvestmentModel(request.body);
      const customer = await CustomerModel.findByPk(payload.customer_id, {
        include: {
          model: CustomerPaymentMethods,
        },
      });
      if (!customer) throw "Customer does not exist";
      const paymentMethod = customer.payment_method;
      if (!paymentMethod) throw "Customer has no payment method";
      if (paymentMethod.payment_method != payload.payment_method)
        throw "Customer has no such payment method";
      const investment = await InvestmentModel.create(payload.toJSON());
      return investment;
    } catch (error) {
      throw error;
    }
  }
  async getInvestments(): Promise<InvestmentModel[]> {
    try {
      const investments = await InvestmentModel.findAll({
        include: [
          {
            model: CustomerModel,
            attributes: ["last_name", "other_names", "mobile", "photo_url"],
          },
        ],
      });
      return investments;
    } catch (error) {
      throw error;
    }
  }
}

export default InvestmentServiceProvider;
