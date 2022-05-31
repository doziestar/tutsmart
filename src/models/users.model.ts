import { IUser } from '@interfaces/users.interface';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export type UserCreationAttributes = Optional<IUser, 'id' | 'email' | 'password'>;

export class UserModel extends Model<IUser, UserCreationAttributes> implements IUser {
  public firstName: string;
  public lastName: string;
  public identityNumber: string;
  public id: number;
  public email: string;
  public password: string;

  public async generateIdentityNumber(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  public async checkFraudScore(): Promise<number> {
    throw new Error('Method not implemented.');
  }

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      identityNumber: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
    },
    {
      tableName: 'users',
      sequelize,
      timestamps: true,
      paranoid: true,
    },
  );

  return UserModel;
}
