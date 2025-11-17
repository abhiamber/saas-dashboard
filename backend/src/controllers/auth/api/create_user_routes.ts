import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { signupFormDataValidation } from "../validations/create-user-validation";
import AppError from "../../../core/app-error";
import { BUSINESS_CODES } from "../../../core/business-code";
import { BUSINESS_MESSAGES } from "../../../core/business-message";
import { BUSINESS_STATUS } from "../../../core/status-code";
import { generateOtp } from "../../../utils/genrate-otp";
import { successResponse } from "../../../core/response";
import { emailOtpVerficationTemplate } from "../../../services/email-otp-verification-template";
import { sendEmail } from "../../../services/send-email-nodemailer";
import { getTenantQuery } from "../query/get-tenant-query";
import { getUserQuery } from "../query/get-user-query";
import { getPendingUserQuery } from "../query/get-pending-user-query";
import { updatePendingUserQuery } from "../query/update-pending-user-query";
import { createPendingUserQuery } from "../query/create-pending-user-query";
dotenv.config();
export const create_user_routes = express.Router();

const signup = async (req: Request, res: Response) => {
    const { name, email, password, tenantName } = req.body;

    signupFormDataValidation(req.body);

    const existingTenant = await getTenantQuery({ tenantName });

    if (existingTenant) {
        throw new AppError(BUSINESS_MESSAGES.TENANT.NAME_EXISTS, BUSINESS_CODES.TENANT_NAME_EXISTS, BUSINESS_STATUS.TENANT.NAME_EXISTS);
    }

    const existingUser = await getUserQuery({ email });

    if (existingUser) {
        throw new AppError(BUSINESS_MESSAGES.USER.EXISTS, BUSINESS_CODES.USER_EXISTS, BUSINESS_STATUS.USER.EXISTS);
    }

    const existingPendingUser = await getPendingUserQuery({ email });

    const otp = generateOtp()

    const passwordHash = await bcrypt.hash(password, 10);

    const emailTemplate = emailOtpVerficationTemplate(otp, email)

    if (existingPendingUser) {
        await updatePendingUserQuery({
            otp: otp,
            passwordHash: passwordHash,
            email
        });
    } else {
        await createPendingUserQuery({
            email,
            passwordHash,
            tenantName: tenantName,
            otp,
            name
        },)

    }
    sendEmail(emailTemplate)

    return res.status(201).json(successResponse({ data: { email }, message: BUSINESS_MESSAGES.OTP.SENT }));
};


create_user_routes.post("/signup", signup);
