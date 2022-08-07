import { CreateUserDto, loginUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;

      const signUpUserData = await this.authService.signup(userData);
      res.status(201).json({
        data: signUpUserData,
        message: 'signup successful, kindly verify your phone number to proceed',
      });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: loginUserDto = req.body;
      console.log('userData', userData);
      const { token, cookie, findUser, expiresIn } = await this.authService.login(userData);

      // res.setHeader('Set-Cookie', [cookie]);
      res.header({ 'x-auth-token': token, 'Set-Cookie': cookie });
      res.status(200).json({ data: findUser, message: 'login successful', token, expiresIn });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      // const userData: UserDocument = req.user;
      // console.log(userData);
      // console.log(req.headers);
      // console.log(req.header);
      // const logOutUserData: UserDocument = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ message: 'logged out successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
