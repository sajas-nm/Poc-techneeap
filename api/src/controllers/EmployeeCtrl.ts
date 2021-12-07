import { Request, Response, NextFunction } from "express";
import { apiErrorHandler } from "../handlers/errorHandler";
import EmployeeRepo from "../repositories/EmployeeRepo";

export default class EmployeeCtrl {
  constructor() {}

  async getAllEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      console.log("params", query.pageSize);
      let limit: number = Number(query.pageSize);
      let offset: number = Number(query.page) * limit;

      const employeeList = await EmployeeRepo.getAllEmployees({
        order: ["name"],
        limit,
        offset,
      });
      res.json(employeeList);
    } catch (error) {
      apiErrorHandler(error, req, res, "Fetch All employees failed.");
    }
  }

  async getEmployeeByDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const lesson = await EmployeeRepo.getEmployeeByDepartment(req.params.id);
      res.json(lesson);
    } catch (error) {
      apiErrorHandler(
        error,
        req,
        res,
        `Employee in department ${req.params.id} failed.`
      );
    }
  }

  async getEmployeeById(req: Request, res: any, next: NextFunction) {
    try {
      const result = await EmployeeRepo.getEmployeeById(req.params.id);
      if (result) {
        return res.json(result);
      } else {
        res.status(404).send(`Employee ${req.params.id} not found.`);
      }
    } catch (error) {
      apiErrorHandler(error, req, res, `Employee ${req.params.id} failed.`);
    }
  }

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await EmployeeRepo.createEmployee(req["value"]["body"]);
      res.json(result);
    } catch (error) {
      apiErrorHandler(error, req, res, "Creation of Employee failed.");
    }
  }

  async updateEmployee(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    try {
      const result = await EmployeeRepo.updateEmployee(
        id,
        req["value"]["body"]
      );
      res.json(result);
    } catch (error) {
      apiErrorHandler(
        error,
        req,
        res,
        `updation of Employee ${req.params.id} is failed.`
      );
    }
  }

  async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    try {
      const result = await EmployeeRepo.deleteEmployee(id);
      res.json(result);
    } catch (error) {
      apiErrorHandler(
        error,
        req,
        res,
        `deletion of Employee ${req.params.id}  is failed.`
      );
    }
  }
}
