import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/db";
import { Employee } from "./Employee";

export class Department extends Model {
  public id!: number;
  public name!: string;
}

Department.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
  },
  {
    sequelize,
    tableName: "Departments",
  }
);

Department.hasMany(Employee, { foreignKey: "departmentId", as: "employees" });
Employee.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "departments",
});
