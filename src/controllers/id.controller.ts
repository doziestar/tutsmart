// import { IUser } from '@/interfaces/users.interface';
import { NextFunction, Request, Response } from 'express';
import idService from '@services/id.service';

class idController {
  public idService = new idService();
  verify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.idService.search(req.body.identityNumber, req.body.type);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default idController;
