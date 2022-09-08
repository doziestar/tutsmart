import { TokenData } from '@interfaces/auth.interface';

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  TutisID: string;
  phoneNumber: string;
  password: string;
  refreshToken: TokenData;
  bvn: string;
  nin: string;
  driverLicense: string;
  passport: string;
  taxId: string;
  vin: string;
  isActive: boolean;

  generateTutisID?(): Promise<string>;
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

export interface IAddress {
  id: string;
  userId: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
  isDefault: boolean;
  logitude: number;
  latitude: number;

  generateAddress?(): Promise<string>;
  getAddressOnMap?(): Promise<string>;
}
