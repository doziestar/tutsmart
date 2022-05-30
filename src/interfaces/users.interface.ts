export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  identityNumber: string;
  password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  generateIdentityNumber(): Promise<string>;
  checkFraudScore(): Promise<number>;
}
