import { EnairaCreateConsumerAccountBody, EnairaUser } from '@/interfaces/enaira.interface';
import EnairaServices from '@/services/enaira.service';
import VirtualPayServices from '@/services/payment.service';

class BridgeServices {
  private enairaServices = EnairaServices;
  private virtualPayServices = VirtualPayServices;

  public async generateVirtualPayAccountNumber(user: EnairaUser): Promise<string> {
    const accountNumber = await this.virtualPayServices.generateVirtualPayAccountNumber(user);
    return accountNumber;
  }

  public async getVirtualPayAccount(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const account = await this.virtualPayServices.getVirtualPayAccount(user);
    return account;
  }

  public async getCustomerAccountDetails(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const account = await this.virtualPayServices.getCustomerAccountDetails(user);
    return account;
  }

  public async getWalletDetails(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const account = await this.virtualPayServices.getWalletDetails(user);
    return account;
  }

  public async walletTransfer(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const account = await this.virtualPayServices.walletTransfer(user);
    return account;
  }

  public async linkVirtualPayAccountToEnairaAccount(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const account = await this.enairaServices.linkVirtualPayAccountToEnairaAccount(user);
    return account;
  }

  public async getEnairaAccountDetails(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const account = await this.enairaServices.getEnairaAccountDetails(user);
    return account;
  }
}

export default new BridgeServices();
