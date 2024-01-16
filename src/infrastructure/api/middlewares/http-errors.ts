import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../helpers/ApiErrors";
import customLogger from "../../logger/pino.logger";

export const httpError = (
  error: Partial<ApiErrors> & Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  customLogger.error(error)
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Internal Server Error";
  response.status(statusCode).json({
    statusCode: statusCode,
    message: message,
  });
  next();
};
