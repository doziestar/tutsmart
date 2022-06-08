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
  bvn: string;
  nin: string;
  driverLicense: string;
  passport: string;
  taxId: string;

  generateIdentityNumber?(): Promise<string>;
  checkFraudScore?(): Promise<number>;
}

export type UserVerificationData = Extract<
  IUser,
  {
    bvn?: string;
    nin?: string;
    driverLicense?: string;
    passport?: string;
    taxId?: string;
  }
>;
