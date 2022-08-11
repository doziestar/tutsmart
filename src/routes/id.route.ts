import idController from '@controllers/id.controller';
import { verifyidentityNumberDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class VerifyRoute implements Routes {
  public path = '/id/';
  public router = Router();
  public idController = new idController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}verify`, validationMiddleware(verifyidentityNumberDto, 'body'), this.idController.verify);
    // this.router.post(`${this.path}vin`, validationMiddleware(verifyidentityNumberDto, 'body'), this.idController.getVotersCard);
    // this.router.post(`${this.path}passport`, validationMiddleware(verifyidentityNumberDto, 'body'), this.idController.getInternationalPassport);
    // this.router.post(`${this.path}drivers-license`, validationMiddleware(verifyidentityNumberDto, 'body'), this.idController.getDriversLicense);
    // this.router.post(`${this.path}bvn`, validationMiddleware(verifyidentityNumberDto, 'body'), this.idController.getBVN);
  }
}

export default VerifyRoute;
