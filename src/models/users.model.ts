import { TokenData } from '@/interfaces/auth.interface';
import { IUser } from '@interfaces/users.interface';
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
  public TutisID: string;
  public id: string;
  public email: string;
  public password: string;
  public refreshToken: TokenData;
  public isActive: boolean;
  public dob: string;
  public vin: string;

  public async generateTutisID(): Promise<string> {
    // generate 6 unique numbers that will be used as the TutisID
    const length = 6;
    return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)).toString();
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
      TutisID: {
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
      dob: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      vin: {
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
          user.TutisID = await user.generateTutisID();
        },
      },
    },
  );

  return UserModel;
}
