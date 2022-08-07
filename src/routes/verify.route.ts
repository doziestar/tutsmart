import VerifyController from '@controllers/verify.controller';
import { verifySignInPhoneNumberDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class VerifyRoute implements Routes {
  public path = '/sms/';
  public router = Router();
  public verifyController = new VerifyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.post(`${this.path}send-notification`, validationMiddleware(updateUserPhoneNumberDto, 'body'), this.verifyController.send);
    this.router.post(`${this.path}verify-code`, validationMiddleware(verifySignInPhoneNumberDto, 'body'), this.verifyController.verify);
  }
}

export default VerifyRoute;
