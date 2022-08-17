import { BVNInterface, BVNResponse } from '@/interfaces/id.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

class BankVerification extends Model implements BVNInterface {
  public userId?: string;
  public response_code: string;
  public response_message: string;
  public response_data: BVNResponse;
  public searchParameter?: string;
}

export default function (sequelize: Sequelize): typeof BankVerification {
  BankVerification.init(
    {
      userId: {
        allowNull: true,
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
        allowNull: false,
        type: DataTypes.JSON,
      },
      searchParameter: {
        allowNull: true,
        type: DataTypes.STRING(45),
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
