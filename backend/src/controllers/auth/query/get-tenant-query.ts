import { models } from "../../../models";

export const getTenantQuery = async ({ tenantName }: Record<string, string>) => {

    return await models.Tenant.findOne({ where: { name: tenantName } });
    
}