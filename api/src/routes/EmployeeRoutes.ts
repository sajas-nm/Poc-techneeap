import { Router } from "express";
import EmployeeCtrl from "../controllers/EmployeeCtrl";
import {
  EmployeeValidator,
  employeeSchema,
} from "../validators/employeeValidator";

class LessonRoutes {
  router = Router();
  employeeCtrl = new EmployeeCtrl();
  employeeValidator = new EmployeeValidator();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.route("/").get(this.employeeCtrl.getAllEmployees);
    this.router
      .route("/department/:id")
      .get(this.employeeCtrl.getEmployeeByDepartment);
    this.router.route("/:id").get(this.employeeCtrl.getEmployeeById);
    this.router
      .route("/")
      .post(
        this.employeeValidator.validateBody(employeeSchema),
        this.employeeCtrl.createEmployee
      );
    this.router
      .route("/:id")
      .put(
        this.employeeValidator.validateBody(employeeSchema),
        this.employeeCtrl.updateEmployee
      );
    this.router.route("/:id").delete(this.employeeCtrl.deleteEmployee);
  }
}

export default new LessonRoutes().router;
