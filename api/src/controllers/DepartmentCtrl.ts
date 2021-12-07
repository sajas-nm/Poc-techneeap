import { Request, Response, NextFunction } from "express";
import DepartmentRepo from "../repositories/DepartmentRepo";
import { apiErrorHandler } from "../handlers/errorHandler";

export default class DepartmentCtrl {
  constructor() {}

  async getAllDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      console.log("params", query.pageSize);
      let limit: number = Number(query.pageSize);
      let offset: number = Number(query.page) * limit;
      // Number(query.page) > 0 ? (Number(query.page) - 1) * limit : 0;
      const departmentList = await DepartmentRepo.getAllDepartment({
        order: ["name"],
        limit,
        offset,
      });
      res.json(departmentList);
    } catch (error) {
      apiErrorHandler(error, req, res, "Fetch All Department failed.");
    }
  }

  async getDepartmentDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const departmentDetails = await DepartmentRepo.getById(req.params.id);
      if (departmentDetails) {
        return res.json(departmentDetails);
      } else {
        res.status(404).send(`Department ${req.params.id} not found.`);
      }
    } catch (error) {
      apiErrorHandler(
        error,
        req,
        res,
        `Department ${req.params.id} is failed.`
      );
    }
  }

  async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await DepartmentRepo.createDepartment(
        req["value"]["body"]
      );
      res.json(result);
    } catch (error) {
      apiErrorHandler(error, req, res, "Creation of department failed.");
    }
  }

  async updateDepartment(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    try {
      const result = await DepartmentRepo.updateDepartment(
        id,
        req["value"]["body"]
      );
      res.json(result);
    } catch (error) {
      apiErrorHandler(
        error,
        req,
        res,
        `updation of department ${req.params.id} is failed.`
      );
    }
  }

  async deleteDepartment(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    try {
      const result = await DepartmentRepo.deleteDepartment(id);
      res.json(result);
    } catch (error) {
      apiErrorHandler(
        error,
        req,
        res,
        `deletion of department ${req.params.id}  is failed.`
      );
    }
  }
}
