import { PassportInterface, PassportResponse } from '@/interfaces/id.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

class InternationalPassport extends Model implements PassportInterface {
  public userId?: string;
  public responseCode: string;
  public description: string;
  public verificationType: string;
  public verificationStatus: string;
  public transactionStatus: string;
  public transactionReference: string;
  public transactionDate: string;
  public searchParameter: string;
  public callBackUrl?: string;
  public livenessScore: string;
  public paymentRef?: string;
  public response: PassportResponse;
  public faceMatch?: string;
}

export default function (sequelize: Sequelize): typeof InternationalPassport {
  InternationalPassport.init(
    {
      userId: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      responseCode: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      verificationType: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      verificationStatus: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      transactionStatus: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      transactionReference: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      transactionDate: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      searchParameter: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      callBackUrl: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      livenessScore: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      paymentRef: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      response: {
        allowNull: true,
        type: DataTypes.JSON,
      },

      faceMatch: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
    },

    {
      sequelize,
      tableName: 'international_passports',
      timestamps: true,
      paranoid: true,
    },
  );
  return InternationalPassport;
}
