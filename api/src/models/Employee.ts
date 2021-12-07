import { sequelize } from "../db/db";
import { Model, DataTypes } from "sequelize";

export class Employee extends Model {
  public id!: number;
  public profilePicUrl!: string;
  public name!: string;
  public dob!: string;
  public departmentId!: number;
}

Employee.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    profilePicUrl: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    dob: { type: DataTypes.STRING },
    departmentId: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: "Employees",
  }
);
