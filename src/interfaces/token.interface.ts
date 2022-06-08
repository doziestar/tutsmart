import { IUser } from '@interfaces/users.interface';
import { Model } from 'sequelize';

export interface Token {
  token: string;
  expiresIn: number;
}

export interface StoredToken extends Model {
  id: string;
  provider: string;
  jwt: string;
  access: string;
  refresh: string;
  userId: string;
}

export interface IStoredTokenService {
  createOrUpdateToken(provider, token: Token, user: IUser): Promise<void>;
  getToken(id: string, user: IUser, skipDecryption, provider, token: string): Promise<StoredToken>;
  verifyToken(provider, user: IUser): Promise<boolean>;
  deleteToken(id: string, provider, user: IUser): Promise<void>;
}
