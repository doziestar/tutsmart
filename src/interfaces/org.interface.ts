import { IAPIData } from '@interfaces/api.interface';
import { IUser, UserVerificationData } from '@interfaces/users.interface';

export interface IOrganization {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: Object;
  logo: string;
  createdAt: Date;
  updatedAt: Date;

  verfyOrganization(): Promise<void>;
  verifyUser(data: UserVerificationData): Promise<void>;
  getUserInformation(data: UserVerificationData): Promise<IUser>;
}

export type IOrganizationWithAPIKey = IOrganization & IAPIData;
