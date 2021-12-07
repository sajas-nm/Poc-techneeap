import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";

interface EmployeeRequest extends Request {
  value?: { body?: string };
}
export class EmployeeValidator {
  constructor() {}

  validateBody(schema) {
    return async (req: EmployeeRequest, res: Response, next: NextFunction) => {
      try {
        const val = await schema.validateAsync(req.body);
        req.value = req.value ?? {};
        req.value.body = req.value.body ?? val;
        next();
      } catch (error) {
        res.status(400).json(error);
      }
    };
  }
}

export const employeeSchema = Joi.object().keys({
  profilePicUrl: Joi.string().trim().uri().required(),
  name: Joi.string().trim(),
  dob: Joi.string().trim().required(),
  departmentId: Joi.number().integer().required(),
});
