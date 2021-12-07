import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";

interface DepartmentRequest extends Request {
  value?: { body?: string };
}

export class DepartmentValidator {
  constructor() {}

  validateBody(schema) {
    return async (
      req: DepartmentRequest,
      res: Response,
      next: NextFunction
    ) => {
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

export const departmentCreateSchema = Joi.object().keys({
  name: Joi.string().trim(),
});
export const departmentUpdateSchema = Joi.object().keys({
  // id: Joi.number().integer().required(),
  name: Joi.string().trim(),
});
