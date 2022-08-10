import { BVNInterface } from '@/interfaces/id.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

class BankVerification extends Model implements BVNInterface {
  public userId: string;
  public response_code: string;
  public response_message: string;
  public response_data: {
    responseCode: string;
    BVN: string;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    registrationDate: string;
    enrollmentBank: string;
    enrollmentBranch: string;
    email: string;
    gender: string;
    levelOfAccount: string;
    lgaOfOrigin: string;
    lgaOfResidence: string;
    maritalStatus: string;
    NIN: string;
    nameOnCard: string;
    nationality: string;
    phoneNumber1: string;
    phoneNumber2: string;
    residentialAddress: string;
    stateOfOrigin: string;
    stateOfResidence: string;
    watchListed: string;
  };
}

export default function (sequelize: Sequelize): typeof BankVerification {
  BankVerification.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      response_code: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      response_message: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      response_data: {
        responseCode: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        BVN: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        firstName: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        middleName: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        lastName: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        dateOfBirth: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        registrationDate: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        enrollmentBank: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        enrollmentBranch: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        gender: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        levelOfAccount: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        lgaOfOrigin: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        lgaOfResidence: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        maritalStatus: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        NIN: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        nameOnCard: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        nationality: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        phoneNumber1: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        phoneNumber2: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        residentialAddress: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        stateOfOrigin: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        stateOfResidence: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
        watchListed: {
          allowNull: false,
          type: DataTypes.STRING(45),
        },
      },
    },
    {
      sequelize,
      tableName: 'bank_verifications',
      timestamps: true,
      paranoid: true,
    },
  );
  return BankVerification;
}
