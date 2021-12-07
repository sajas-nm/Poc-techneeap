import { Employee } from "../models/Employee";

class EmployeeRepo {
  constructor() {}

  getAllEmployees(options) {
    return Employee.findAndCountAll(options);
  }

  getEmployeeById(id) {
    return Employee.findByPk(id);
  }

  getEmployeeByDepartment(id) {
    return Employee.findAll({ where: { departmentId: id } });
  }

  createEmployee(props: any) {
    return Employee.create(props);
  }

  updateEmployee(id: Number, props: any) {
    return Employee.update(props, { where: { id: id.toString() } });
  }

  deleteEmployee(id: Number) {
    return Employee.destroy({ where: { id: id.toString() } });
  }
}

export default new EmployeeRepo();
