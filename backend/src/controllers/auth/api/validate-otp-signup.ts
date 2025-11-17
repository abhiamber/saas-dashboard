import express from "express";
export const create_user_routes = express.Router();

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { models } from "../../../models";
import { Request, Response } from "express";
import AppError from "../../../core/app-error";
import { BUSINESS_CODES } from "../../../core/business-code";
import { BUSINESS_MESSAGES } from "../../../core/business-message";
import { BUSINESS_STATUS } from "../../../core/status-code";
import { getPendingUserQuery } from "../query/get-pending-user-query";
import { createTenantQuery } from "../query/create-tenant-query";
import { createUserQuery } from "../query/create-user-query";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const validateOtpForSignUp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const pendingUser = await getPendingUserQuery({ email })

    if (!pendingUser) {

        throw new AppError(BUSINESS_MESSAGES.USER.NOT_FOUND, BUSINESS_CODES.USER_NOT_FOUND, BUSINESS_STATUS.USER.NOT_FOUND);

    }

    const tenant = await createTenantQuery({ tenantName: pendingUser.tenantName })

    const user = await createUserQuery({ email, name: pendingUser.name, passwordHash: pendingUser.passwordHash, tenantId: tenant.id })

    const token = jwt.sign(
        { id: user.id, tenantId: tenant.id },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    // 8. Response
    return res.status(201).json({
        success: true,
        token,
        user: {
            name: user.name,
            email: user.email,
        },
    });
};


create_user_routes.post("/signup", validateOtpForSignUp);
