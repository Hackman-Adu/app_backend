import { Model } from "sequelize";
import { Column, DataType, Table } from "sequelize-typescript";

@Table({
  tableName: "loan_schedule",
  modelName: "Loan Schedule",
})
class LoanScheduleModel extends Model {
  @Column({
    type: DataType.STRING(255),
  })
  declare id: string;
}

export default LoanScheduleModel;
