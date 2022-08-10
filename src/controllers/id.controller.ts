// import { IUser } from '@/interfaces/users.interface';
import { NextFunction, Request, Response } from 'express';
import idService from '@services/id.service';

class idController {
  getNIN = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await idService.findNIN(req.body.identityNumber);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getVotersCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await idService.findVotersCard(req.body.identityNumber);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getInternationalPassport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await idService.findPassport(req.body.identityNumber);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getDriversLicense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await idService.findDriversLicense(req.body.identityNumber);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getBVN = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await idService.findBVN(req.body.identityNumber);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default idController;
