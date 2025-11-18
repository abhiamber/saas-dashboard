import { models } from "../../../models";

export const getPendingUserQuery = async ({ email }: Record<string, string>) => {

    return await models.PendingUser.findOne({ where: { email },  raw: true });
    
}