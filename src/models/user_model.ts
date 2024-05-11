import bycrpt from "bcrypt";
import {
  BeforeCreate,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  modelName: "UserModel",
  timestamps: true,
  createdAt: "created",
  updatedAt: "updated",
})
class UserModel extends Model {
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare user_id: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  first_name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  mobile!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password!: string;

  @BeforeCreate
  static async hashPassword(instance: UserModel) {
    const hashedPassword = await bycrpt.hash(instance.password, 10);
    instance.password = hashedPassword;
  }
}

export default UserModel;
