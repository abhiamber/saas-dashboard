import { Request, Response, NextFunction } from "express";
import AppError from "../core/app-error";
import {
  ValidationError as SequelizeValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError,
} from "sequelize";

import { BUSINESS_CODES } from "../core/business-code";
import { BUSINESS_MESSAGES } from "../core/business-message";
import { BUSINESS_STATUS } from "../core/status-code";

export const globalErrorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log("🔥 Error Caught by Global Handler:", err);


  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.code || BUSINESS_CODES.UNKNOWN,
      message: err.message,
    });
  }


  if (err instanceof SequelizeValidationError) {
    return res.status(BUSINESS_STATUS.COMMON.BAD_REQUEST).json({
      success: false,
      code: BUSINESS_CODES.BAD_REQUEST,
      message: err.errors.map((e) => e.message).join(", "),
    });
  }


  if (err instanceof UniqueConstraintError) {
    return res.status(BUSINESS_STATUS.USER.EXISTS).json({
      success: false,
      code: BUSINESS_CODES.USER_EXISTS,
      message: BUSINESS_MESSAGES.USER.EXISTS,
    });
  }


  if (err instanceof ForeignKeyConstraintError) {
    return res.status(BUSINESS_STATUS.TENANT.NOT_FOUND).json({
      success: false,
      code: BUSINESS_CODES.TENANT_NOT_FOUND,
      message: BUSINESS_MESSAGES.TENANT.NOT_FOUND,
    });
  }


  if (err instanceof DatabaseError) {
    return res.status(500).json({
      success: false,
      code: BUSINESS_CODES.UNKNOWN,
      message: err.message || BUSINESS_MESSAGES.COMMON.SOMETHING_WENT_WRONG,
    });
  }


  if (err.name === "JsonWebTokenError") {
    return res.status(BUSINESS_STATUS.AUTH.UNAUTHORIZED).json({
      success: false,
      code: BUSINESS_CODES.UNAUTHORIZED,
      message: BUSINESS_MESSAGES.AUTH.UNAUTHORIZED,
    });
  }


  if (err.name === "TokenExpiredError") {
    return res.status(BUSINESS_STATUS.AUTH.TOKEN_EXPIRED).json({
      success: false,
      code: BUSINESS_CODES.UNAUTHORIZED,
      message: BUSINESS_MESSAGES.AUTH.TOKEN_EXPIRED,
    });
  }


  return res.status(500).json({
    success: false,
    code: BUSINESS_CODES.UNKNOWN,
    message: BUSINESS_MESSAGES.COMMON.SOMETHING_WENT_WRONG,
  });
};
