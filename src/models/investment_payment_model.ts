import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import CustomerModel from "./customer_model";
import InvestmentModel from "./investment_model";

@Table({
  tableName: "customer_investment_payments",
  modelName: "InvestmentPayment",
  createdAt: "created",
  updatedAt: "updated",
})
class InvestmentPaymemtModel extends Model {
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
  investment_id!: string;

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

  @BelongsTo(() => InvestmentModel, "investment_id")
  investment: InvestmentModel | undefined;

  @BelongsTo(() => CustomerModel, "customer_id")
  customer: CustomerModel | undefined;
}

export default InvestmentPaymemtModel;
