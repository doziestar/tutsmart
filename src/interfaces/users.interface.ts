export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  identityNumber: string;
  password: string;

  generateIdentityNumber?(): Promise<string>;
  checkFraudScore?(): Promise<number>;
}
