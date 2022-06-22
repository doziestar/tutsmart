import { StoredToken } from '@/interfaces/token.interface';
import Cryptr from 'cryptr';
import { DataTypes, Model, Sequelize } from 'sequelize';

const crypto = new Cryptr(process.env.CRYPTO_SECRET);

class TokenData extends Model implements StoredToken {
  public id: string;
  public provider: string;
  public jwt: string;
  public access: string;
  public refresh: string;
  public userId: string;
}

export default function (sequelize: Sequelize): typeof TokenData {
  return TokenData.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      provider: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jwt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      access: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refresh: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Token',
      timestamps: true,
      paranoid: true,
    },
  );
}
