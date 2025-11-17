import { Sequelize, DataTypes, Model, Optional, ModelStatic } from "sequelize";

export interface DashboardAttributes {
  id: number;
  title: string;
  tenantId?: number | null;
  layout?: object | null;
}

export interface DashboardCreationAttributes
  extends Optional<DashboardAttributes, "id"> {}

export interface DashboardInstance
  extends Model<DashboardAttributes, DashboardCreationAttributes>,
    DashboardAttributes {}

export default ({
  sequelize,
  DataTypes: DT,
}: {
  sequelize: Sequelize;
  DataTypes: typeof DataTypes;
}): ModelStatic<DashboardInstance> & {
  associate?: (models: any) => void;
} => {
  const Dashboard = sequelize.define<DashboardInstance>(
    "Dashboard",
    {
      id: {
        type: DT.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DT.STRING,
        allowNull: false,
      },
      tenantId: {
        type: DT.INTEGER,
        allowNull: true,
      },
      layout: {
        type: DT.JSON,
        allowNull: true,
      },
    },
    {
      tableName: "Dashboards",
    }
  ) as ModelStatic<DashboardInstance> & {
    associate?: (models: any) => void;
  };

  Dashboard.associate = (models) => {
    Dashboard.belongsTo(models.Tenant, { foreignKey: "tenantId" });
    Dashboard.hasMany(models.Widget, { foreignKey: "dashboardId" });
  };

  return Dashboard;
};
