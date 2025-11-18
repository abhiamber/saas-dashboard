import express from "express";
export const validateOtpForSignUpRoute = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import AppError from "../../../core/app-error";
import { BUSINESS_CODES } from "../../../core/business-code";
import { BUSINESS_MESSAGES } from "../../../core/business-message";
import { BUSINESS_STATUS } from "../../../core/status-code";
import { getPendingUserQuery } from "../query/get-pending-user-query";
import { createTenantQuery } from "../query/create-tenant-query";
import { createUserQuery } from "../query/create-user-query";
import { successResponse } from "../../../core/response";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const validateOtpForSignUp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    console.log(email, otp)
    const pendingUser = await getPendingUserQuery({ email })

    if (!pendingUser) {

        throw new AppError(BUSINESS_MESSAGES.USER.NOT_FOUND, BUSINESS_CODES.USER_NOT_FOUND, BUSINESS_STATUS.USER.NOT_FOUND);

    }
    const isExpired = new Date() < pendingUser.otpExpiresAt;
    if (isExpired) {
        throw new AppError(BUSINESS_MESSAGES.OTP.EXPIRED, BUSINESS_CODES.OTP_EXPIRED, BUSINESS_STATUS.OTP.EXPIRED);
    }

    const tenant = await createTenantQuery({ tenantName: pendingUser.tenantName })

    const user = await createUserQuery({ email, name: pendingUser.name, passwordHash: pendingUser.passwordHash, tenantId: tenant.id })

    const token = jwt.sign(
        { id: user.id, tenantId: tenant.id },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    return res.status(201).json(
        successResponse({
            data: {
                token,
                user: {
                    name: user.name,
                    email: user.email,
                },
            },
            message: BUSINESS_MESSAGES.OTP.VERIFIED

        })
    );
};


validateOtpForSignUpRoute.post("/singup-otp", validateOtpForSignUp);
