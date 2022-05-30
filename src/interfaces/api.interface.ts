export interface IAPIData {
  apiKey: string;
  apiSecret: string;

  generateAPIData(): Promise<object>;
  checkAPIData(): Promise<boolean>;
}
