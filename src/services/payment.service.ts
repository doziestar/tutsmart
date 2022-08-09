// virtual pay services from apis.ng "https://rgw.k8s.apis.ng/centric-platforms/uat/virtualpay/"
import { EnairaCreateConsumerAccountBody, EnairaUser } from '@/interfaces/enaira.interface';
import fetch from 'node-fetch';
import { VIRTUAL_PAY_BASE_URL } from '@/config';

class VirtualPayServices {
  private virtualPayBaseUrl = VIRTUAL_PAY_BASE_URL;

  public async generateVirtualPayAccountNumber(user: EnairaUser): Promise<string> {
    const response = await fetch(`${this.virtualPayBaseUrl}GenerateVirtualPayAccountNumber`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
    });
    const data = await response.json();
    return data.accountNumber;
  }

  public async getVirtualPayAccount(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const response = await fetch(`${this.virtualPayBaseUrl}FetchCustomerAccounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }

  public async getCustomerAccountDetails(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const response = await fetch(`${this.virtualPayBaseUrl}FetchCustomerDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }

  public async getWalletDetails(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const response = await fetch(`${this.virtualPayBaseUrl}GetAccountDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }

  public async walletTransfer(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const response = await fetch(`${this.virtualPayBaseUrl}SinglePost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }

  public async walletTransferMultiple(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const response = await fetch(`${this.virtualPayBaseUrl}MultiplePost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }

  public async holdHistory(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const response = await fetch(`${this.virtualPayBaseUrl}HoldHistory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }

  public async holdFunds(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const response = await fetch(`${this.virtualPayBaseUrl}HoldFunds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }

  public async releaseFunds(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const response = await fetch(`${this.virtualPayBaseUrl}ReleaseFunds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }

  public async getAccountBalance(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const response = await fetch(`${this.virtualPayBaseUrl}GetAccountBalance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }

  public async makePayment(user: EnairaUser): Promise<EnairaCreateConsumerAccountBody> {
    const response = await fetch(`${this.virtualPayBaseUrl}MakePayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }
}

export default new VirtualPayServices();
