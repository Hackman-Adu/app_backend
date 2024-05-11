import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { dbConfig } from "./db_config";

class DatabaseConnection {
  constructor() {
    this.connection = this.initConnection();
  }

  private initConnection(): Sequelize {
    const sequelise = new Sequelize(this.dbConfig);
    return sequelise;
  }

  private dbConfig: SequelizeOptions = dbConfig;

  private connection: Sequelize;

  public static instance: Sequelize = new DatabaseConnection().connection;
}

export default DatabaseConnection;
