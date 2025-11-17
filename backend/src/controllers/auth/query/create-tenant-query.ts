import { models } from "../../../models";

export const createTenantQuery = async ({ tenantName }: Record<string, string>) => {

    return await models.Tenant.create({ name: tenantName });
    
}