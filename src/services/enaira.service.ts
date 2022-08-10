import { ENAIRA_API_URL, ENAIRA_USER_API_URL } from '@/config';
import {
  CreateEnairaInvoiceBody,
  EnairaCreateConsumerAccountBody,
  EnairaTransactionRespse,
  EnairaUser,
  PayTransactionWithPinBody,
} from '@/interfaces/enaira.interface';
import fetch from 'node-fetch';

class EnairaService {
  private enairaBaseUrl = ENAIRA_API_URL;
  private enairaUserUrl = ENAIRA_USER_API_URL;

  public async getEnairaUser(userId: string): Promise<EnairaUser> {
    const response = await fetch(`${this.enairaUserUrl}${userId}`);
    const data = await response.json();
    return data;
  }

  public async createEnairaUser(user: EnairaUser): Promise<EnairaUser> {
    const response = await fetch(this.enairaUserUrl, {
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

  public async createEnairaConsumerAccount(user: EnairaCreateConsumerAccountBody): Promise<EnairaUser> {
    const response = await fetch(`${this.enairaBaseUrl}CreateConsumer`, {
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

  public async createEnairaInvoice(user: CreateEnairaInvoiceBody): Promise<EnairaTransactionRespse> {
    const response = await fetch(`${this.enairaBaseUrl}CreateInvoice`, {
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

  public async payEnairaInvoiceWithPin(user: PayTransactionWithPinBody): Promise<EnairaTransactionRespse> {
    const response = await fetch(`${this.enairaBaseUrl}PayWithTransactionPin`, {
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

  public async linkWalletToAccount(user: EnairaUser, account: string): Promise<EnairaUser> {
    const response = await fetch(`${this.enairaBaseUrl}link-wallet-to-account`, {
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

  public async getEnairaInvoice(invoiceId: string): Promise<EnairaTransactionRespse> {
    const response = await fetch(`${this.enairaBaseUrl}${invoiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
    });
    const data = await response.json();
    return data;
  }

  public async getEnairaTransaction(transactionId: string): Promise<EnairaTransactionRespse> {
    const response = await fetch(`${this.enairaBaseUrl}${transactionId}`);
    const data = await response.json();
    return data;
  }

  public async getEnairaTransactions(userId: string): Promise<EnairaTransactionRespse[]> {
    const response = await fetch(`${this.enairaBaseUrl}${userId}/transactions`);
    const data = await response.json();
    return data;
  }

  public async getEnairaWallet(userId: string): Promise<EnairaUser> {
    const response = await fetch(`${this.enairaBaseUrl}${userId}/wallet`);
    const data = await response.json();
    return data;
  }

  public async getEnairaWalletBalance(userId: string): Promise<EnairaUser> {
    const response = await fetch(`${this.enairaBaseUrl}/GetBalance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json();
    return data;
  }

  public async getEnairaWalletTransactions(userId: string): Promise<EnairaTransactionRespse[]> {
    const response = await fetch(`${this.enairaBaseUrl}${userId}/wallet/transactions`);
    const data = await response.json();
    return data;
  }

  // CreateWithdrawal
  public async createWithdrawal(user: EnairaUser, amount: number): Promise<EnairaTransactionRespse> {
    const response = await fetch(`${this.enairaBaseUrl}CreateWithdrawal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify({ user, amount }),
    });
    const data = await response.json();
    return data;
  }

  // PaymentFromWallet
  public async paymentFromWallet(user: EnairaUser, amount: number): Promise<EnairaTransactionRespse> {
    const response = await fetch(`${this.enairaBaseUrl}PaymentFromWallet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify({ user, amount }),
    });
    const data = await response.json();
    return data;
  }

  // CreateMerchant
  public async createMerchant(user: EnairaUser, merchant: EnairaMerchant): Promise<EnairaUser> {
    const response = await fetch(`${this.enairaBaseUrl}CreateMerchant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify({ user, merchant }),
    });
    const data = await response.json();
    return data;
  }

  // EnairaUser GetUserDetailsByPhone
  public async getUserDetailsByPhone(phone: string): Promise<EnairaUser> {
    const response = await fetch(`${this.enairaBaseUrl}GetUserDetailsByPhone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify({ phone }),
    });
    const data = await response.json();
    return data;
  }

  // EnairaUser GetUserDetailsByWalletAlias
  public async getUserDetailsByWalletAlias(walletAlias: string): Promise<EnairaUser> {
    const response = await fetch(`${this.enairaBaseUrl}GetUserDetailsByWalletAlias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify({ walletAlias }),
    });
    const data = await response.json();
    return data;
  }

  // EnairaUser PayWithToken
  public async payWithToken(user: EnairaUser, amount: number): Promise<EnairaTransactionRespse> {
    const response = await fetch(`${this.enairaBaseUrl}PayWithToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify({ user, amount }),
    });
    const data = await response.json();
    return data;
  }

  // EnairaUser CreateConsumerV2
  public async createConsumerV2(user: EnairaUser): Promise<EnairaUser> {
    const response = await fetch(`${this.enairaBaseUrl}CreateConsumerV2`, {
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

  // EnairaUser CreateMerchantV2
  public async createMerchantV2(user: EnairaUser, merchant: EnairaMerchant): Promise<EnairaUser> {
    const response = await fetch(`${this.enairaBaseUrl}CreateMerchantV2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ClientId: 'our-client-id',
      },
      body: JSON.stringify({ user, merchant }),
    });
    const data = await response.json();
    return data;
  }
}

export default new EnairaService();
