import VerifyController from '@controllers/verify.controller';
import { GovernmentIdDto, VerifySignInPhoneNumberDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class VerifyRoute implements Routes {
  public path = '/verify/';
  public router = Router();
  public verifyController = new VerifyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.post(`${this.path}send-notification`, validationMiddleware(updateUserPhoneNumberDto, 'body'), this.verifyController.send);
    this.router.post(`${this.path}sms-code`, validationMiddleware(VerifySignInPhoneNumberDto, 'body'), this.verifyController.verify);
    this.router.post(`$(this.path)government-id`, validationMiddleware(GovernmentIdDto, 'body'), this.verifyController.verifyGovernmentId);
  }
}

export default VerifyRoute;
