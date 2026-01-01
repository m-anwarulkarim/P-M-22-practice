import { NextFunction, Request, Response } from "express";
import { UserRole } from "../types/role.type";

const role = (...role: UserRole[]) => {
  return (req: Response, res: Request, next: NextFunction) => {
    try {
      next();
    } catch (error) {
      next();
    }
  };
};
