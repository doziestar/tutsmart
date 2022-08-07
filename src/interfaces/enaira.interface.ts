export interface EnairaUser {
  user_email: string;
  user_token: string;
  user_type: string;
  channel_code: string;
}

export interface TransactionBody {
  user_id?: string;
  account_no?: string;
  amount: string;
  reference: string;
  narration: string;
}

export interface EnairaTransaction extends TransactionBody, EnairaUser {}

export interface EnairaTransactionRespse {
  status: string;
  message: string;
  data: {
    transaction_id: string;
    transaction_reference: string;
    transaction_amount: string;
    transaction_currency: string;
    transaction_status: string;
    transaction_date: string;
    transaction_type: string;
    transaction_narration: string;
    transaction_channel: string;
    transaction_account_no: string;
    transaction_account_name: string;
    transaction_account_bank: string;
  };
}

export interface EnairaCreateConsumerAccountBody extends EnairaUser {
  customer_tier: string;
  reference: string;
  account_no: string;
  bvn: string;
  password: string;
  nin: string;
}

export interface EnairaPaymentFromWalletBody extends TransactionBody {
  destination_wallet_alias: string;
}

export interface CreateEnairaInvoiceBody extends TransactionBody {
  product_code: string;
}

export interface PayTransactionWithPinBody extends TransactionBody {
  transaction_pin: string;
  phone_number: string;
  invoice_id: string;
  product_code: string;
}

export interface CreateMerchantAccountBody {
  channel_code: string;
  customer_tier: string;
  reference: string;
  account_no: string;
  director_bvn: string;
  tin: string;
  user_name: string;
  city: string;
  state: string;
  wallet_category: string;
  password: string;
}
