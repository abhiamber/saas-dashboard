import { Sequelize, DataTypes, Model, Optional, ModelStatic } from "sequelize";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  tenantId?: number;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "role" | "tenantId"> { }

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
  UserAttributes { }

export default ({
  sequelize,
  DataTypes: DT,
}: {
  sequelize: Sequelize;
  DataTypes: typeof DataTypes;
}): ModelStatic<UserInstance> & { associate?: (models: any) => void } => {

  const User = sequelize.define<UserInstance>(
    "User",
    {
      id: {
        type: DT.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DT.STRING,
        allowNull: false,
      },
      email: {
        type: DT.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DT.STRING,
        allowNull: false,
      },
      role: {
        type: DT.STRING,
        defaultValue: "user",
      },
      tenantId: {
        type: DT.INTEGER,
      },
    },
    {
      tableName: "Users",
    }
  ) as ModelStatic<UserInstance> & { associate?: (models: any) => void };

  User.associate = (models) => {
    User.belongsTo(models.Tenant, { foreignKey: "tenantId" });
  };

  return User;
};
