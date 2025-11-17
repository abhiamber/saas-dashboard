import { models } from "../../../models";

export const createPendingUserQuery = async ({ otp,passwordHash, email, tenantName, name  }: Record<string, string>) => {

    return  await models.PendingUser.create(
        {
            email,
            passwordHash,
            tenantName: tenantName,
            otp,
            otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
            name
        },
    );
    
}