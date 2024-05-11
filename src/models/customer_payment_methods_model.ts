import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import CustomerModel from "./customer_model";

@Table({
  tableName: "customer_payment_methods",
  modelName: "CustomerPaymentMethods",
  createdAt: "created",
  updatedAt: "updated",
  timestamps: true,
})
class CustomerPaymentMethods extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  declare method_id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  customer_id!: string;

  @Column({
    type: DataType.ENUM("bank", "momo"),
    defaultValue: "momo",
    allowNull: false,
  })
  payment_method!: string;

  @BelongsTo(() => CustomerModel, "customer_id")
  customer: CustomerModel | undefined;

  @BeforeCreate
  static convertToUpperCase(instance: CustomerPaymentMethods) {
    const method = instance.payment_method?.toUpperCase();
    instance.payment_method = method;
  }
}

export default CustomerPaymentMethods;
