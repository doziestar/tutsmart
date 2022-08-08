// interacting with Enaira API, getting data from Enaira API and allowing users to
// 1. create a consumer account
// 2. pay from their wallet
// 3. create an invoice
// 4. pay an invoice with a pin
// 5. pay an invoice with a pin and phone number
// 6. pay an invoice with a pin and phone number and invoice id
// 7. pay an invoice with a pin and phone number and invoice id and product code
// 8. pay an invoice with a pin and phone number and invoice id and product code and transaction pin
// 9. pay an invoice with a pin and phone number and invoice id and product code and transaction pin and phone number
// 10. link a wallet to an account
// 11. link a wallet to an account and transaction pin

import { EnairaUser, TransactionBody, EnairaTransaction, EnairaTransactionRespse, EnairaCreateConsumerAccountBody, EnairaPaymentFromWalletBody, CreateEnairaInvoiceBody, PayTransactionWithPinBody, CreateMerchantAccountBody } from '@/interfaces/enaira.interface';
import fetch from 'node-fetch';


class EnairaService {

  private baseUrl = 'https://api.enaira.com/v1';
