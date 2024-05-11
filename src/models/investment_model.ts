import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import CustomerModel from "./customer_model";
import InvestmentPaymemtModel from "./investment_payment_model";

@Table({
  tableName: "customer_investments",
  modelName: "InvestmentModel",
  createdAt: "created",
  updatedAt: "updated",
})
class InvestmentModel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare investment_id: string;

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
    type: DataType.ENUM("GHS", "USD"),
    defaultValue: "GHS",
    allowNull: false,
  })
  currency!: string;

  @Column({
    type: DataType.DOUBLE(18, 2),
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.FLOAT(4, 2),
    allowNull: false,
  })
  interest_rate!: number;

  @Column({
    type: DataType.ENUM("monthly", "yearly"),
    defaultValue: "monthly",
    allowNull: false,
  })
  payment_frequency!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  payment_method!: string;

  @BelongsTo(() => CustomerModel, "customer_id")
  customer: CustomerModel | undefined;

  @HasMany(() => InvestmentPaymemtModel, "investment_id")
  investment_payments: Array<InvestmentPaymemtModel> | undefined;
}

export default InvestmentModel;
