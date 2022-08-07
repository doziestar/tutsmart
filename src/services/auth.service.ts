import DB from '@/databases';
import { CreateUserDto, loginUserDto, updateUserPasswordDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { IUser } from '@interfaces/users.interface';
import { VerifyUser } from '@utils/twil';
import { isEmpty } from '@utils/util';
import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

class AuthService {
  public users = DB.Users;

  public async signup(userData: CreateUserDto): Promise<void> {
    if (isEmpty(userData)) throw new HttpException(400, 'Your information is empty');

    const findUser = await this.users.findOne({
      where: {
        $email$: userData.email,
        $phoneNumber$: userData.phoneNumber,
      },
    });

    if (findUser) throw new HttpException(409, `Account with phoneNumber ${userData.phoneNumber} or email ${userData.email} already exists`);

    // create new user
    const newUser = await this.users.create(userData);

    const user = _.pick(await newUser.save(), ['_id', 'email', 'phoneNumber', 'isAdmin']);
    await VerifyUser(user.phoneNumber);

    // SendSMS(newUser);
  }

  public async login(userData: loginUserDto): Promise<{ token: string; cookie: string; findUser: IUser; expiresIn: Number }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser = await this.users.findOne({
      where: {
        $email$: userData.email,
        $phoneNumber$: userData.phoneNumber,
        $bvn$: userData.bvn,
        $nin$: userData.nin,
        $identityNumber$: userData.identityNumber,
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
      expiresIn: config.get('jwt.expiresIn'),
    };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public forgotPassword = async (userData: updateUserPasswordDto, email: string): Promise<void> => {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser = await this.users.findOne({ where: { $email$: email } });
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
