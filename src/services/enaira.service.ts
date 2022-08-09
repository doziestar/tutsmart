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

  private async getEnairaUser(userId: string): Promise<EnairaUser> {
    const response = await fetch(`${this.enairaUserUrl}${userId}`);
    const data = await response.json();
    return data;
  }

  private async createEnairaUser(user: EnairaUser): Promise<EnairaUser> {
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

  private async createEnairaConsumerAccount(user: EnairaCreateConsumerAccountBody): Promise<EnairaUser> {
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

  private async createEnairaInvoice(user: CreateEnairaInvoiceBody): Promise<EnairaTransactionRespse> {
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

  private async payEnairaInvoiceWithPin(user: PayTransactionWithPinBody): Promise<EnairaTransactionRespse> {
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

  private async linkWalletToAccount(user: EnairaUser, account: string): Promise<EnairaUser> {
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

  private async getEnairaInvoice(invoiceId: string): Promise<EnairaTransactionRespse> {
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

  private async getEnairaTransaction(transactionId: string): Promise<EnairaTransactionRespse> {
    const response = await fetch(`${this.enairaBaseUrl}${transactionId}`);
    const data = await response.json();
    return data;
  }

  private async getEnairaTransactions(userId: string): Promise<EnairaTransactionRespse[]> {
    const response = await fetch(`${this.enairaBaseUrl}${userId}/transactions`);
    const data = await response.json();
    return data;
  }

  private async getEnairaWallet(userId: string): Promise<EnairaUser> {
    const response = await fetch(`${this.enairaBaseUrl}${userId}/wallet`);
    const data = await response.json();
    return data;
  }

  private async getEnairaWalletBalance(userId: string): Promise<EnairaUser> {
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

  private async getEnairaWalletTransactions(userId: string): Promise<EnairaTransactionRespse[]> {
    const response = await fetch(`${this.enairaBaseUrl}${userId}/wallet/transactions`);
    const data = await response.json();
    return data;
  }

  // CreateWithdrawal
  private async createWithdrawal(user: EnairaUser, amount: number): Promise<EnairaTransactionRespse> {
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
  private async paymentFromWallet(user: EnairaUser, amount: number): Promise<EnairaTransactionRespse> {
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
  private async createMerchant(user: EnairaUser, merchant: EnairaMerchant): Promise<EnairaUser> {
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
  private async getUserDetailsByPhone(phone: string): Promise<EnairaUser> {
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
  private async getUserDetailsByWalletAlias(walletAlias: string): Promise<EnairaUser> {
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
  private async payWithToken(user: EnairaUser, amount: number): Promise<EnairaTransactionRespse> {
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
  private async createConsumerV2(user: EnairaUser): Promise<EnairaUser> {
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
  private async createMerchantV2(user: EnairaUser, merchant: EnairaMerchant): Promise<EnairaUser> {
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
