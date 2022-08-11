import authMiddleware from '@/middlewares/auth.middleware';
import VirtualPaymentController from '@controllers/payment.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class VirtualPaymentsRoute implements Routes {
  public path = '/payment';
  public router = Router();
  public constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.post(
      '/generateVirtualPayAccountNumber',
      [authMiddleware, validationMiddleware(null, 'body')],
      VirtualPaymentController.generateVirtualPayAccountNumber,
    );
    this.router.post('/getVirtualPayAccount', [authMiddleware, validationMiddleware(null, 'body')], VirtualPaymentController.getVirtualPayAccount);
    this.router.post(
      '/getCustomerAccountDetails',
      [authMiddleware, validationMiddleware(null, 'body')],
      VirtualPaymentController.getCustomerAccountDetails,
    );
    this.router.post('/getWalletDetails', [authMiddleware, validationMiddleware(null, 'body')], VirtualPaymentController.getWalletDetails);
    this.router.post('/walletTransfer', [authMiddleware, validationMiddleware(null, 'body')], VirtualPaymentController.walletTransfer);
    this.router.post(
      '/walletTransferMultiple',
      [authMiddleware, validationMiddleware(null, 'body')],
      VirtualPaymentController.walletTransferMultiple,
    );
    this.router.post('/holdHistory', [authMiddleware, validationMiddleware(null, 'body')], VirtualPaymentController.holdHistory);
    this.router.post('/holdFunds', [authMiddleware, validationMiddleware(null, 'body')], VirtualPaymentController.holdFunds);
    this.router.post('/releaseFunds', [authMiddleware, validationMiddleware(null, 'body')], VirtualPaymentController.releaseFunds);
    this.router.post('/getAccountBalance', [authMiddleware, validationMiddleware(null, 'body')], VirtualPaymentController.getAccountBalance);
    this.router.post('/makePayment', [authMiddleware, validationMiddleware(null, 'body')], VirtualPaymentController.makePayment);
  }
}

export default VirtualPaymentsRoute;
