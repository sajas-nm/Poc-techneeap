import { Application } from "express";
import departmentRouter from "./DepartmentRoutes";
import employeeRouter from "./EmployeeRoutes";
import imageUploadeRouter from "./ImageUploadeRoute";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/department", departmentRouter);
    app.use("/api/employee", employeeRouter);
    app.use("/api/uploade", imageUploadeRouter);
  }
}
