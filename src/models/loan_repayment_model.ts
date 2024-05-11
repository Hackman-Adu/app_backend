import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import CustomerLoanModel from "./customer_loans_model";
import CustomerModel from "./customer_model";

@Table({
  tableName: "customer_loan_repayments",
  modelName: "LoanRepaymentModel",
  timestamps: true,
  createdAt: "created",
  updatedAt: "updated",
})
class LoanRepaymentModel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  loan_id!: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  customer_id!: string;

  @Column({
    type: DataType.DOUBLE(18, 2),
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date!: Date;

  @BelongsTo(() => CustomerLoanModel, "loan_id")
  loan: CustomerLoanModel | undefined;

  @BelongsTo(() => CustomerModel, "customer_id")
  customer: CustomerModel | undefined;
}

export default LoanRepaymentModel;
