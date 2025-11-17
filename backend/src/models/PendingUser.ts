import { Sequelize, DataTypes, Model, Optional, ModelStatic } from "sequelize";

export interface PendingUserAttributes {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
    tenantName: string;
    otp: string;
    otpExpiresAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PendingUserCreationAttributes extends Optional<PendingUserAttributes, "id" | "createdAt" | "updatedAt"> { }

export interface PendingUserInstance extends Model<PendingUserAttributes, PendingUserCreationAttributes>, PendingUserAttributes { }

export default ({
    sequelize,
    DataTypes: DT,
}: {
    sequelize: Sequelize;
    DataTypes: typeof DataTypes;
}): ModelStatic<PendingUserInstance> & { associate?: (models: any) => void } => {
    const PendingUser = sequelize.define<PendingUserInstance>(
        "PendingUser",
        {
            id: { type: DT.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: DT.STRING, allowNull: false },
            email: { type: DT.STRING, allowNull: false, unique: true },
            passwordHash: { type: DT.STRING, allowNull: false },
            tenantName: { type: DT.STRING, allowNull: true },
            otp: { type: DT.STRING, allowNull: false },
            otpExpiresAt: { type: DT.DATE, allowNull: false },
            createdAt: { type: DT.DATE, allowNull: false, defaultValue: DT.NOW },
            updatedAt: { type: DT.DATE, allowNull: false, defaultValue: DT.NOW }
        },
        { tableName: "PendingUsers" }
    ) as ModelStatic<PendingUserInstance> & { associate?: (models: any) => void };

    // No associations
    PendingUser.associate = () => { };

    return PendingUser;
};
