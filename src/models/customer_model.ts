import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import CustomerLoanModel from "./customer_loans_model";
import CustomerPaymentMethods from "./customer_payment_methods_model";
import InvestmentModel from "./investment_model";
import InvestmentPaymemtModel from "./investment_payment_model";
import LoanRepaymentModel from "./loan_repayment_model";

@Table({
  tableName: "customers",
  modelName: "Customer",
  createdAt: "created",
  updatedAt: "updated",
})
class CustomerModel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
    onUpdate: "NO ACTION",
  })
  declare customer_id: string;

  @Column({
    type: DataType.STRING(70),
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  other_names!: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
  })
  mobile!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  place_of_work!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  location!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
    defaultValue: null,
  })
  photo_url!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  loan_reference!: string;

  @HasOne(() => CustomerPaymentMethods, "customer_id")
  payment_method: CustomerPaymentMethods | undefined;

  @HasMany(() => CustomerLoanModel, "customer_id")
  loans: Array<CustomerLoanModel> | undefined;

  @HasMany(() => LoanRepaymentModel, "customer_id")
  repayments: Array<LoanRepaymentModel> | undefined;

  @HasMany(() => InvestmentModel, "customer_id")
  investments: Array<InvestmentModel> | undefined;

  @HasMany(() => InvestmentPaymemtModel, "customer_id")
  investment_payments: Array<InvestmentPaymemtModel> | undefined;
}

export default CustomerModel;
