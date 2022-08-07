import { TokenData } from '@/interfaces/auth.interface';
import { IUser } from '@interfaces/users.interface';
import { randomBytes } from 'crypto';
import { DataTypes, Model, Optional, Sequelize, UUIDV4 } from 'sequelize';

export type UserCreationAttributes = Optional<IUser, 'id' | 'email' | 'password'>;

export class UserModel extends Model<IUser, UserCreationAttributes> implements IUser {
  public bvn: string;
  public nin: string;
  public driverLicense: string;
  public passport: string;
  public taxId: string;
  public phoneNumber: string;
  public firstName: string;
  public lastName: string;
  public identityNumber: string;
  public id: string;
  public email: string;
  public password: string;
  public refreshToken: TokenData;
  public isActive: boolean;

  public async generateIdentityNumber(): Promise<string> {
    const uid = Math.random().toString(36).slice(2) + randomBytes(8).toString('hex') + new Date().getTime();
    // get random 8 numbers from uid output
    const random = uid.substring(2, 10);
    return random;
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
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4(),
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
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      refreshToken: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      bvn: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      nin: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      driverLicense: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      passport: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      taxId: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      isActive: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'users',
      sequelize,
      timestamps: true,
      paranoid: true,
      hooks: {
        async beforeCreate(user: UserModel) {
          user.identityNumber = await user.generateIdentityNumber();
        },
      },
    },
  );

  return UserModel;
}
