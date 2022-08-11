import { CreateEnairaInvoiceBody, EnairaCreateConsumerAccountBody, EnairaUser, PayTransactionWithPinBody } from '@/interfaces/enaira.interface';
import EnairaService from '@/services/enaira.service';
import { NextFunction, Request, Response } from 'express';

class EnairaController {
  public async createEnairaUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: EnairaUser = req.body;
      const user: any = await EnairaService.createEnairaUser(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async createEnairaConsumerAccount(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: EnairaCreateConsumerAccountBody = req.body;
      const user: any = await EnairaService.createEnairaConsumerAccount(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async createEnairaInvoice(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: CreateEnairaInvoiceBody = req.body;
      const user: any = await EnairaService.createEnairaInvoice(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  // public async getEnairaTransaction(req: Request, res: Response, next: NextFunction): Promise<Response> {
  //   try {
  //     const userId: string = req.params.userId;
  //     const user: any = await EnairaService.getEnairaTransaction(userId);
  //     return res.status(200).json(user);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  public async payEnairaInvoiceWithPin(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: PayTransactionWithPinBody = req.body;
      const user: any = await EnairaService.payEnairaInvoiceWithPin(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async linkWalletToAccount(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: EnairaUser = req.body;
      const user: any = await EnairaService.linkWalletToAccount(userData, req.params.account);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async getEnairaInvoice(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userId: string = req.params.userId;
      const user: any = await EnairaService.getEnairaInvoice(userId);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  // public async getEnairaInvoiceStatus(req: Request, res: Response, next: NextFunction): Promise<Response> {
  //   try {
  //     const userId: string = req.params.userId;
  //     const user: any = await EnairaService.getEnairaInvoiceStatus(userId);
  //     return res.status(200).json(user);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // public async getEnairaTransactionStatus(req: Request, res: Response, next: NextFunction): Promise<Response> {
  //   try {
  //     const userId: string = req.params.userId;
  //     const user: any = await EnairaService.getEnairaTransactionStatus(userId);
  //     return res.status(200).json(user);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // public async getEnairaTransactions(req: Request, res: Response, next: NextFunction): Promise<Response> {
  //   try {
  //     const userId: string = req.params.userId;
  //     const user: any = await EnairaService.getEnairaTransactions(userId);
  //     return res.status(200).json(user);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // public async getEnairaWallet(req: Request, res: Response, next: NextFunction): Promise<Response> {
  //   try {
  //     const userId: string = req.params.userId;
  //     const user: any = await EnairaService.getEnairaWallet(userId);
  //     return res.status(200).json(user);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  public async getEnairaWalletBalance(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userId: string = req.params.userId;
      const user: any = await EnairaService.getEnairaWalletBalance(userId);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  // public async getEnairaWalletTransactions(req: Request, res: Response, next: NextFunction): Promise<Response> {
  //   try {
  //     const userId: string = req.params.userId;
  //     const user: any = await EnairaService.getEnairaWalletTransactions(userId);
  //     return res.status(200).json(user);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  public async createWithdrawal(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await EnairaService.createWithdrawal(userData, parseInt(req.params.account, 10));
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  // public async getWithdrawal(req: Request, res: Response, next: NextFunction): Promise<Response> {
  //   try {
  //     const userId: string = req.params.userId;
  //     const user: any = await EnairaService.getWithdrawal(userId);
  //     return res.status(200).json(user);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // public async getWithdrawalStatus(req: Request, res: Response, next: NextFunction): Promise<Response> {
  //   try {
  //     const userId: string = req.params.userId;
  //     const user: any = await EnairaService.getWithdrawalStatus(userId);
  //     return res.status(200).json(user);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // public async getWithdrawals(req: Request, res: Response, next: NextFunction): Promise<Response> {
  //   try {
  //     const userId: string = req.params.userId;
  //     const user: any = await EnairaService.getWithdrawals(userId);
  //     return res.status(200).json(user);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  public async paymentFromWallet(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await EnairaService.paymentFromWallet(userData, parseInt(req.params.account, 10));
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  // public async paymentToWallet(req: Request, res: Response, next: NextFunction): Promise<Response> {
  //   try {
  //     const userData: any = req.body;
  //     const user: any = await EnairaService.paymentToWallet(userData);
  //     return res.status(200).json(user);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  public async createMerchant(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await EnairaService.createMerchant(userData, req.body.account);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async getUserDetailsByPhone(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await EnairaService.getUserDetailsByPhone(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async getUserDetailsByWalletAlias(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await EnairaService.getUserDetailsByWalletAlias(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async payWithToken(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData: any = req.body;
      const user: any = await EnairaService.payWithToken(userData, 500);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async createConsumerV2(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData = req.body;
      const user: any = await EnairaService.createConsumerV2(userData);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public async createMerchantV2(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userData = req.body;
      const user: any = await EnairaService.createMerchantV2(userData, req.body.account);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
}

export default new EnairaController();
