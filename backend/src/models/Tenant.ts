import { Sequelize, DataTypes, Model, Optional, ModelStatic } from "sequelize";

export interface TenantAttributes {
  id: number;
  name: string;
  subscriptionType?: string;
}

export interface TenantCreationAttributes
  extends Optional<TenantAttributes, "id" | "subscriptionType"> {}

export interface TenantInstance
  extends Model<TenantAttributes, TenantCreationAttributes>,
    TenantAttributes {}

export default ({
  sequelize,
  DataTypes: DT,
}: {
  sequelize: Sequelize;
  DataTypes: typeof DataTypes;
}): ModelStatic<TenantInstance> & { associate?: (models: any) => void } => {
  const Tenant = sequelize.define<TenantInstance>(
    "Tenant",
    {
      id: {
        type: DT.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DT.STRING,
        allowNull: false,
      },
      subscriptionType: {
        type: DT.STRING,
        defaultValue: "free",
      },
    },
    {
      tableName: "Tenants",
    }
  ) as ModelStatic<TenantInstance> & { associate?: (models: any) => void };

  Tenant.associate = (models) => {
    Tenant.hasMany(models.User, { foreignKey: "tenantId" });
    Tenant.hasMany(models.Dashboard, { foreignKey: "tenantId" });
  };

  return Tenant;
};
