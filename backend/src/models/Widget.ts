import { Sequelize, DataTypes, Model, Optional, ModelStatic } from "sequelize";

export interface WidgetAttributes {
  id: number;
  type: string;
  dashboardId?: number;
  config?: any;
}

export interface WidgetCreationAttributes
  extends Optional<WidgetAttributes, "id" | "dashboardId" | "config"> {}

export interface WidgetInstance
  extends Model<WidgetAttributes, WidgetCreationAttributes>,
    WidgetAttributes {}

export default ({
  sequelize,
  DataTypes: DT,
}: {
  sequelize: Sequelize;
  DataTypes: typeof DataTypes;
}): ModelStatic<WidgetInstance> & { associate?: (models: any) => void } => {
  
  const Widget = sequelize.define<WidgetInstance>(
    "Widget",
    {
      id: {
        type: DT.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DT.STRING,
        allowNull: false,
      },
      dashboardId: {
        type: DT.INTEGER,
      },
      config: {
        type: DT.JSON,
        allowNull: true,
      },
    },
    {
      tableName: "Widgets",
    }
  ) as ModelStatic<WidgetInstance> & { associate?: (models: any) => void };

  Widget.associate = (models) => {
    Widget.belongsTo(models.Dashboard, { foreignKey: "dashboardId" });
  };

  return Widget;
};
