import { models } from "../../../models";
export const getUserQuery = async ({ email }: Record<string, string>) => {

    return await models.User.findOne({ where: { email }, raw:true });
    
}