import DB from '@/databases';
// import { IUser } from '@/interfaces/users.interface';
import { NextFunction, Request, Response } from 'express';
import axios from '@utils/axios';

class idController {
  getNIN = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await DB.Users.findOne({ where: { identityNumber: req.body.identityNumber } });
      const NIN = await axios.NINValidationByNIN(user.nin);
      res.json(NIN);
    } catch (error) {
      next(error);
    }
  };

  getVotersCard = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await DB.Users.findOne({ where: { identityNumber: req.body.identityNumber } });
      const result = await axios.VotersCard(user.vin);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getInternationalPassport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await DB.Users.findOne({ where: { identityNumber: req.body.identityNumber } });
      const result = await axios.InternationalPassport({
        searchParameter: user.passport,
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getDriversLicense = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await DB.Users.findOne({ where: { identityNumber: req.body.identityNumber } });
      const NIN = await axios.DriversLicense({ searchParameter: user.passport, firstName: user.firstName, lastName: user.lastName, dob: user.dob });
      res.json(NIN);
    } catch (error) {
      next(error);
    }
  };

  getBVN = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await DB.Users.findOne({ where: { identityNumber: req.body.identityNumber } });
      const result = await axios.BVN(user.bvn);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default idController;
