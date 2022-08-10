import { UpdateProfileDto, UpdateUserDto, UserIdDto } from '@dtos/users.dto';
import { IUser, UserProfileDocument } from '@interfaces/users.interface';
import userService from '@services/users.service';
import { NextFunction, Request, Response } from 'express';

class UsersController {
  public userService = new userService();

  public async getMe(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const userId: UserIdDto = { userId: req.params.userId };
      const user: IUser = await this.userService.me(userId);
      return res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: IUser[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId: UserIdDto = { userId: req.params.id };
      const findOneUserData: IUser = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public generateUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId: UserIdDto = { userId: req.params.id };

      const genID: UserProfileDocument = await this.userService.generateUserId(userId);

      res.status(200).json({ data: genID, message: 'Generate User ID' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UpdateUserDto = req.body;
      const userId: string = req.params.id;
      console.log(userData + 'controller');
      console.log(userId + 'controller');

      const updateUserData: IUser = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'User Updated' });
    } catch (error) {
      next(error);
    }
  };

  public updateUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UpdateProfileDto = req.body;
      const userId: string = req.params.id;
      console.log(userData + 'controller');
      console.log(userId + 'controller');

      const updateUserData: IUser = await this.userService.updateUserProfile(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'User Updated' });
    } catch (error) {
      next(error);
    }
  };

  // public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userData: CreateUserDto = req.body;
  //     const createUserData: User = await this.userService.createUser(userData);

  //     res.status(201).json({ data: createUserData, message: 'created' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userId = Number(req.params.id);
  //     const userData: CreateUserDto = req.body;
  //     const updateUserData: User[] = await this.userService.updateUser(userId, userData);

  //     res.status(200).json({ data: updateUserData, message: 'updated' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   try {
  //     const userId = Number(req.params.id);
  //     const deleteUserData: User[] = await this.userService.deleteUser(userId);

  //     res.status(200).json({ data: deleteUserData, message: 'deleted' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default UsersController;
