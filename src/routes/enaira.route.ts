import authMiddleware from '@/middlewares/auth.middleware';
import EnairaController from '@controllers/enaira.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class EnairaRoute implements Routes {
  public path = '/enaira';
  public router = Router();
  private enairaController = EnairaController;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/user', [authMiddleware, validationMiddleware(null, 'params', true)], this.enairaController.getEnairaUser);
    this.router.post('/user', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.createEnairaUser);
    this.router.post(
      '/consumer-account',
      [authMiddleware, validationMiddleware(null, 'body', true)],
      this.enairaController.createEnairaConsumerAccount,
    );
    this.router.post('/invoice', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.createEnairaInvoice);
    this.router.get('/transaction', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.getEnairaTransaction);
    this.router.post('/invoice/pay', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.payEnairaInvoiceWithPin);
    this.router.post('/wallet/link', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.linkWalletToAccount);
    this.router.get('/invoice', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.getEnairaInvoice);
    this.router.get('/invoice/status', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.getEnairaInvoiceStatus);
    this.router.get(
      '/transaction/status',
      [authMiddleware, validationMiddleware(null, 'body', true)],
      this.enairaController.getEnairaTransactionStatus,
    );
    this.router.get('/transactions', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.getEnairaTransactions);
    this.router.get('/wallet', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.getEnairaWallet);
    this.router.get('/wallet/balance', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.getEnairaWalletBalance);
    this.router.get(
      '/wallet/transactions',
      [authMiddleware, validationMiddleware(null, 'body', true)],
      this.enairaController.getEnairaWalletTransactions,
    );
    this.router.post('/withdrawal', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.createWithdrawal);
    this.router.get('/withdrawal', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.getWithdrawal);
    this.router.get('/withdrawal/status', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.getWithdrawalStatus);
    this.router.get('/withdrawals', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.getWithdrawals);
    this.router.post('/payment/from-wallet', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.paymentFromWallet);
    this.router.post('/payment/to-wallet', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.paymentToWallet);
    this.router.post('/merchant', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.createMerchant);
    this.router.get('/merchant', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.getMerchant);
    this.router.get('/user/phone', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.getUserDetailsByPhone);
    this.router.get(
      '/user/wallet-alias',
      [authMiddleware, validationMiddleware(null, 'body', true)],
      this.enairaController.getUserDetailsByWalletAlias,
    );
    this.router.post('/pay-with-token', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.payWithToken);
    this.router.post('/consumer-v2', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.createConsumerV2);
    this.router.post('/merchant-v2', [authMiddleware, validationMiddleware(null, 'body', true)], this.enairaController.createMerchantV2);
  }
}

export default EnairaRoute;
