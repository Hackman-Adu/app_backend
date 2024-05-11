import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import CustomerModel from "./customer_model";
import LoanRepaymentModel from "./loan_repayment_model";

@Table({
  tableName: "customer_loans",
  modelName: "CustomerLoans",
  createdAt: "created",
  updatedAt: "updated",
  timestamps: true,
})
class CustomerLoanModel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare loan_id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  customer_id!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date!: Date;

  @Column({
    type: DataType.DOUBLE(18, 2),
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.ENUM("GHS", "USD"),
    defaultValue: "GHS",
    allowNull: false,
  })
  currency!: string;

  @Column({
    type: DataType.ENUM(
      "amortization",
      "reducing_balance",
      "interest_only_till_maturity",
      "custom"
    ),
    defaultValue: "amortization",
    allowNull: false,
  })
  repayment_profile!: string;

  @Column({
    type: DataType.SMALLINT({ length: 3 }),
    allowNull: false,
  })
  period!: number;

  @Column({
    type: DataType.ENUM("month", "day", "year"),
    defaultValue: "month",
    allowNull: false,
  })
  period_unit!: string;

  @BelongsTo(() => CustomerModel, "customer_id")
  customer: CustomerModel | undefined;

  @HasMany(() => LoanRepaymentModel, "loan_id")
  repayments: Array<LoanRepaymentModel> | undefined;
}

export default CustomerLoanModel;
