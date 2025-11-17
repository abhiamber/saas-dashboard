export default class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  code: string;

  constructor(message: any, code: string, statusCode: number) {
    super(typeof message === "string" ? message : JSON.stringify(message));

    this.statusCode = statusCode;
    this.code = code;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
