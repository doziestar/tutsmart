export interface IAPIData {
  id: string;
  apiKey: string;
  apiSecret: string;
  userId: string;

  generateAPIData(): Promise<void>;
  checkAPIData(key: string, secret: string): Promise<boolean>;
  revokeAPIData(): Promise<void>;
}
