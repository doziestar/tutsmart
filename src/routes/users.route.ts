import authMiddleware from '@/middlewares/auth.middleware';
import UsersController from '@controllers/users.controller';
import { UpdateProfileDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/me', authMiddleware, this.usersController.getMe);
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    this.router.post(`${this.path}/genid/:id`, this.usersController.generateUserId);
    this.router.post(`${this.path}/update/:id`, validationMiddleware(UpdateUserDto, 'body', true), this.usersController.updateUser);
    this.router.post(`${this.path}/profile-update/:id`, validationMiddleware(UpdateProfileDto, 'body', true), this.usersController.updateUserProfile);
    // this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    // this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
