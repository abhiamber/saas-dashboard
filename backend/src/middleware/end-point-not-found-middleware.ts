import { NextFunction, Request, Response } from "express";
import { BUSINESS_CODES } from "../core/business-code";
import { BUSINESS_MESSAGES } from "../core/business-message";

export const notFoundHandler = (req: Request, res: Response, _next: NextFunction) => {
    return res.status(404).json({
      success: false,
      code: BUSINESS_CODES.NOT_FOUND,
      message: BUSINESS_MESSAGES.COMMON.ROUTE_NOT_FOUND,
      path: req.originalUrl,
    });
  };
  