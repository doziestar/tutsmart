import { IUser } from '@interfaces/users.interface';
import { Request } from 'express';

export interface DataStoredInToken {
  id: string;
  expiresIn: number;
  email: string;
  type?: 'API-key' | 'Authorization';
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: IUser;
}
