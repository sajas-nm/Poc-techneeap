import { Router } from "express";
import DepartmentCtrl from "../controllers/DepartmentCtrl";
import {
  DepartmentValidator,
  departmentCreateSchema,
  departmentUpdateSchema,
} from "../validators/departmentValidator";
class CourseRoutes {
  router = Router();
  departmentCtrl = new DepartmentCtrl();
  employeeValidator = new DepartmentValidator();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.route("/").get(this.departmentCtrl.getAllDepartment);
    this.router.route("/:id").get(this.departmentCtrl.getDepartmentDetails);
    this.router
      .route("/")
      .post(
        this.employeeValidator.validateBody(departmentCreateSchema),
        this.departmentCtrl.createDepartment
      );
    this.router
      .route("/:id")
      .put(
        this.employeeValidator.validateBody(departmentUpdateSchema),
        this.departmentCtrl.updateDepartment
      );
    this.router.route("/:id").delete(this.departmentCtrl.deleteDepartment);
  }
}
export default new CourseRoutes().router;
