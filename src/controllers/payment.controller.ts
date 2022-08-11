import VirtualPayService from '@/services/payment.service';
import { NextFunction, Request, Response } from 'express';

class PaymentController {
  public async generateVirtualPayAccountNumber(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await VirtualPayService.generateVirtualPayAccountNumber(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
  public async getVirtualPayAccount(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await VirtualPayService.getVirtualPayAccount(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
  public async getCustomerAccountDetails(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await VirtualPayService.getCustomerAccountDetails(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
  public async getWalletDetails(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await VirtualPayService.getWalletDetails(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
  public async walletTransfer(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await VirtualPayService.walletTransfer(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async walletTransferMultiple(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await VirtualPayService.walletTransferMultiple(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async holdHistory(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await VirtualPayService.holdHistory(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async holdFunds(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await VirtualPayService.holdFunds(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async releaseFunds(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await VirtualPayService.releaseFunds(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async getAccountBalance(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await VirtualPayService.getAccountBalance(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async makePayment(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await VirtualPayService.makePayment(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new PaymentController();
