import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.join(__dirname + "../../../.env") });

import { Department } from "../models/Department";
import { Employee } from "../models/Employee";
const department: object[] = require("./department.json");

Department.sync({ force: true })
  .then(() => Employee.sync({ force: true }))
  .then(() => console.log("Database cleaned"))
  .then(() =>
    Department.bulkCreate(department, {
      include: [{ model: Employee, as: "employees" }],
    })
  )
  .then(() => {
    console.log("############# seeding completed #################");
    process.exit();
  })
  .catch(console.error);
