import { NextFunction, Request, Response } from "express";
import { ROLE } from "../types/role.type";

const role = (...role: ROLE[]) => {
  return (req: Response, res: Request, next: NextFunction) => {
    try {
      next();
    } catch (error) {
      next();
    }
  };
};

export default role;
