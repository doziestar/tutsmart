import { PassportInterface } from '@/interfaces/id.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

class InternationalPassport extends Model implements PassportInterface {
  public userId: string;
  public responseCode: string;
  public description: string;
  public verificationType: string;
  public verificationStatus: string;
  public transactionStatus: string;
  public transactionReference: string;
  public transactionDate: string;
  public searchParameter: string;
  public callBackUrl?: string;
  public livenessScore: number;
  public paymentRef?: string;
  public response: {
    first_name: string;
    last_name: string;
    middle_name: string;
    dob: string;
    mobile?: string;
    photo: string;
    gender: string;
    issued_at: string;
    issued_date: string;
    expiry_date: string;
    reference_id: string;
  };
  faceMatch?: string;
}

export default function (sequelize: Sequelize): typeof InternationalPassport {
  BankVerification.init(
    {
      userId: {
        allowNull: false,
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
        paymentRef: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
        response: {
          first_name: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          last_name: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          middle_name: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          dob: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          mobile: {
            allowNull: true,
            type: DataTypes.STRING(45),
          },
          photo: {
            allowNull: false,
            type: DataTypes.STRING(45), //todo
          },
          gender: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          issued_at: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          issued_date: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          expiry_date: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
          reference_id: {
            allowNull: false,
            type: DataTypes.STRING(45),
          },
        },
        faceMatch: {
          allowNull: true,
          type: DataTypes.STRING(45),
        },
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
