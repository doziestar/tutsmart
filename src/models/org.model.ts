import { IOrganizationWithAPIKey } from '@/interfaces/org.interface';
import { IUser, UserVerificationData } from '@/interfaces/users.interface';
import bcrypt from 'bcrypt';
import Coinkey from 'coinkey';
import { DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize';

const WALLET = new Coinkey.createRandom();

class Organization extends Model implements IOrganizationWithAPIKey {
  public id: string;
  public apiKey: string;
  public apiSecret: string;
  public userId: string;
  public name: string;
  public email: string;
  public phoneNumber: string;
  public address: Object;
  public logo: string;
  public createdAt: Date;
  public updatedAt: Date;

  public async generateAPIData(): Promise<void> {
    this.apiKey = await this.generateAPIKey();
    this.apiSecret = await this.generateAPISecret();
  }

  public async checkAPIData(key: string, secret: string): Promise<boolean> {
    const compareKey = await bcrypt.compare(key, this.apiKey);
    const compareSecret = await bcrypt.compare(secret, this.apiSecret);
    return compareKey && compareSecret;
  }

  public async generateAPIKey(): Promise<string> {
    const apiKey = WALLET.publicAddress.toString('hex');
    const hash = await bcrypt.hash(apiKey, 10);
    return hash;
  }

  public generateAPISecret(): Promise<string> {
    const apiSecret = WALLET.privateKey.toString('hex') + WALLET.publicKey.toString('hex');
    return bcrypt.hash(apiSecret, 10);
  }

  public async verfyOrganization(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async verifyUser(data: UserVerificationData): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async getUserInformation(data: UserVerificationData): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}

export default function (sequelize: Sequelize): typeof Organization {
  Organization.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4(),
      },
      apiKey: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      apiSecret: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      phoneNumber: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      address: {
        allowNull: true,
        type: DataTypes.JSON,
      },
      logo: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
    },
    {
      sequelize,
      tableName: 'organizations',
      timestamps: true,
      paranoid: true,
    },
  );
  return Organization;
}
