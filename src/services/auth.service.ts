import { JWT_EXPIRATION_TIME, SECRET_KEY } from '@/config';
import DB from '@/databases';
import { CreateUserDto, LoginUserDto, UpdateUserPasswordDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { IUser } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { Op } from 'sequelize';

class AuthService {
  public users = DB.Users;

  public async signup(userData: CreateUserDto): Promise<Partial<IUser>> {
    if (isEmpty(userData)) throw new HttpException(400, 'Your information is empty');

    const findUser = await this.users.findOne({
      where: {
        [Op.or]: [{ email: userData.email }, { phoneNumber: userData.phoneNumber }],
      },
    });
    if (findUser) throw new HttpException(400, 'User already exists');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const password: string = await bcrypt.hash(userData.password, salt);

    const newUser = await this.users.create({
      ...userData,
      password,
    });

    if (!newUser) throw new HttpException(400, 'User not created');

    const user = _.pick(await newUser.save(), ['id', 'email', 'phoneNumber', 'identityNumber', 'firstName', 'lastName']);
    // await VerifyUser(user.phoneNumber);
    return user;

    // SendSMS(newUser);
  }

  public async login(userData: LoginUserDto): Promise<{ token: string; cookie: string; findUser: IUser; expiresIn: Number }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser = await this.users.findOne({
      where: {
        [Op.or]: [
          {
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            bvn: userData.bvn,
            nin: userData.nin,
            identityNumber: userData.identityNumber,
          },
        ],
      },
    });
    if (!findUser) throw new HttpException(409, "Your login is either wrong or you're not active");

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Your login is either wrong or you're not active");

    const tokenData: TokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    const user = _.pick(findUser, ['_id', 'email', 'phoneNumber', 'firstName', 'lastName']);
    const token = tokenData.token;
    const expiresIn = tokenData.expiresIn;

    return { token, cookie, findUser, expiresIn };
  }

  public createToken(user: IUser): TokenData {
    const dataStoredInToken: DataStoredInToken = {
      id: user.id,
      email: user.email,
      expiresIn: parseInt(JWT_EXPIRATION_TIME, 10),
    };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public forgotPassword = async (userData: UpdateUserPasswordDto, email: string): Promise<void> => {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser = await this.users.findOne({ where: { email: email } });
    if (!findUser) throw new HttpException(409, "You're not user");

    const isPasswordMatching: boolean = await bcrypt.compare(userData.oldPassword, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    if (userData.newPassword !== userData.confirmPassword) throw new HttpException(409, "You're password not matching");

    const salt = await bcrypt.genSalt(10);
    const newPassword: string = await bcrypt.hash(userData.newPassword, salt);
    findUser.password = newPassword;
    await findUser.save();
  };
}

export default AuthService;
