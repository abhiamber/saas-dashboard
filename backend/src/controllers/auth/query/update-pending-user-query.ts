import { models } from "../../../models";

export const updatePendingUserQuery = async ({ otp,passwordHash, email  }: Record<string, string>) => {

    return await models.PendingUser.update(
        {
            otp: otp,
            otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
            updatedAt: new Date(),
            passwordHash: passwordHash,
        },
        { where: { email } }
    );
    
}