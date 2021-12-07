import { Department } from "../models/Department";
import { Employee } from "../models/Employee";

class DepartmentRepo {
  constructor() {}

  getAllDepartment(options) {
    return Department.findAndCountAll(options);
  }

  getById(depId) {
    return Department.findByPk(depId, {
      include: [
        {
          model: Employee,
          as: "employees",
        },
      ],
    });
  }
  createDepartment(props: any) {
    return Department.create(props);
  }

  updateDepartment(id: Number, props: any) {
    return Department.update(props, { where: { id: id.toString() } });
  }

  deleteDepartment(id: Number) {
    return Department.destroy({ where: { id: id.toString() } });
  }
}

export default new DepartmentRepo();
