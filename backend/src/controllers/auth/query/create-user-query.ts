import { models } from "../../../models";
interface CreateUserInput {
    email: string;
    name: string;
    passwordHash: string;
    tenantId: number;
  }
  

export const createUserQuery = async ({ email, name, passwordHash, tenantId }: CreateUserInput) => {

    return await models.User.create({
        name,
        email,
        password: passwordHash,
        tenantId,
    });
    
}