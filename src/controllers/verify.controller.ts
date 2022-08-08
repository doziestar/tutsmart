import DB from '@/databases';
import { GovernmentIdDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { IUser } from '@/interfaces/users.interface';
import VerificationService from '@/services/verify.service';
import { logger } from '@/utils/logger';
import { isEmpty } from '@/utils/util';
import { client, SendSMS } from '@utils/twil';
import config from 'config';
import { NextFunction, Request, Response } from 'express';

class VerifyController {
  public verifyService = new VerificationService();

  public send = function VerifyUser(phoneNumber: string) {
    return new Promise((resolve, reject) => {
      client.verify
        .services(config.get('TWILIO_VERIFY_SERVICE_SID'))
        .verifications.create({ to: phoneNumber, channel: 'sms' })
        .then(verification => {
          resolve(verification);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  public verify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const phoneNumber = req.body.phoneNumber;
      const code = req.body.code;
      const verification = await client.verify.services(config.get('TWILIO_VERIFY_SERVICE_SID')).verificationChecks.create({ to: phoneNumber, code });
      if (verification.status === 'approved') {
        logger.info('Verify code is approved');
        // update user isActive to true
        const user = await DB.Users.findOne({ where: { phoneNumber } });
        user.isActive = true;
        await user.save();
        console.log(`verifying ${user}`);
        await SendSMS(user);
        console.log(`verifying ${user}`);
        res.json(verification);
      } else {
        res.json(verification);
      }
    } catch (error) {
      next(error);
    }
  };

  public loginVerify = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const phoneNumber = req.body.phoneNumber;
      const code = req.body.code;
      const verification = await client.verify.services(config.get('TWILIO_VERIFY_SERVICE_SID')).verificationChecks.create({ to: phoneNumber, code });
      if (verification.status === 'approved') {
        const user: IUser = await DB.Users.findOne({
          where: {
            phoneNumber,
          },
        });
        if (user) {
          res.json(user);
        }
      }
    } catch (error) {
      next(error);
    }
  };

  public verifyGovernmentId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: GovernmentIdDto = req.body;

      if (isEmpty(userData)) throw new HttpException(400, 'We need your government id to verify you');
      const verifyGovernmentIdData = await this.verifyService.verifyGovernmentId(userData);
      res.status(200).json({ data: verifyGovernmentIdData, message: 'government id verified successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default VerifyController;
