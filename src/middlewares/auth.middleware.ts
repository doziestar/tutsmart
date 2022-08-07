import { SECRET_KEY } from '@config';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

/**
 *
 * TODO: 1. get Authorization or get the API-Key
 * @param res
 * @param next
 */
const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.header('Authorization')
      ? req.header('Authorization').split('Bearer ')[1]
      : req.header('API-key')
      ? req.header('API-key').split('Bearer TUT')[1]
      : null;

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = verify(Authorization, secretKey) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await DB.Users.findByPk(userId);

      // get expireDate from token and compare it with current date
      const expireDate = new Date(verificationResponse.expiresIn * 1000);
      const currentDate = new Date();
      if (currentDate > expireDate) {
        throw new HttpException(401, 'Token expired');
      }

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        if (verificationResponse.type === 'API-key') next(new HttpException(401, 'Invalid API key'));
        else next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'User not logged in'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
