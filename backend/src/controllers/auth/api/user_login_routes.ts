
import express from "express"
export const user_login_routes = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { getUserQuery } from "../query/get-user-query";
import AppError from "../../../core/app-error";
import { BUSINESS_MESSAGES } from "../../../core/business-message";
import { BUSINESS_CODES } from "../../../core/business-code";
import { BUSINESS_STATUS } from "../../../core/status-code";
import { successResponse } from "../../../core/response";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await getUserQuery({ email })
    if (!user) {
        throw new AppError(BUSINESS_MESSAGES.USER.NOT_FOUND, BUSINESS_CODES.USER_NOT_FOUND, BUSINESS_STATUS.USER.NOT_FOUND);

    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        throw new AppError(BUSINESS_MESSAGES.AUTH.INVALID_CREDENTIALS, BUSINESS_CODES.INVALID_CREDENTIALS, BUSINESS_STATUS.AUTH.INVALID_CREDENTIALS);

    const token = jwt.sign(
        { id: user.id, tenantId: user.tenantId },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json(
        successResponse({
            data: {
                token,
                user: { id: user.id, name: user.name, email: user.email, tenantId: user.tenantId }
            },
            message: BUSINESS_MESSAGES.AUTH.LOG_IN_SUCCESSFULL

        })
    )


};

user_login_routes.get("/login", login);