import { TokenData } from '@interfaces/auth.interface';

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  identityNumber: string;
  phoneNumber: string;
  password: string;
  refreshToken: TokenData;

  generateIdentityNumber?(): Promise<string>;
  checkFraudScore?(): Promise<number>;
}
