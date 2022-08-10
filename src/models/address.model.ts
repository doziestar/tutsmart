import { IAddress } from '@/interfaces/id.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

class Address extends Model implements IAddress {
  public userId: string;
  public address: string;
  public isCurrentAddress: boolean;
}

export default function (sequelize: Sequelize): typeof Address {
  Address.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      isCurrentAddress: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      tableName: 'bankVerification',
      timestamps: true,
      paranoid: true,
    },
  );
  return BankVerification;
}
