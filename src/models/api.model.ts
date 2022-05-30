import { IAPIData } from '@/interfaces/api.interface';
import { DataTypes, Model, Sequelize } from 'sequelize';

class APIData extends Model implements IAPIData {
  public apiKey: string;
  public apiSecret: string;

  public async generateAPIData(): Promise<object> {
    this.apiKey = this.generateAPIKey();
    this.apiSecret = this.generateAPISecret();
    return {
      apiKey: this.apiKey,
      apiSecret: this.apiSecret,
    };
  }

  public checkAPIData(): Promise<boolean> {
    return;
  }

  public generateAPIKey(): string {
    return 'apiKey';
  }

  public generateAPISecret(): string {
    return 'apiSecret';
  }
}

export default function (sequelize: Sequelize): typeof APIData {
  APIData.init(
    {
      apiKey: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      apiSecret: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: 'api',
      sequelize,
    },
  );

  return APIData;
}
