import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { IUser } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: IUser = await this.authService.signup(userData);
      const data = _.pick(signUpUserData, ['id', 'email', 'firstName', 'lastName', 'identityNumber', 'phoneNumber']);

      res.status(201).json({ data: data, message: 'Thank you for creating an account with us.' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;
      const { accessToken, refreshToken, findUser } = await this.authService.login(userData);
      const data = _.pick(findUser, ['id', 'email', 'firstName', 'lastName', 'identityNumber', 'phoneNumber']);

      res.setHeader('Authorization', `Bearer ${accessToken.token}`);
      res.setHeader('Refresh-Token', `Bearer ${refreshToken.token}`);
      res.status(200).json({ data: data, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public revokeToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.user;
      await this.authService.revokeToken(userData);

      this.logOut(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.user;
      const logOutUserData: IUser = await this.authService.logout(userData);

      res.setHeader('Authorization', ['Authorization=; Max-age=0']);
      res.setHeader('Refresh-Token', ['Refresh-Token=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
