import { CreateUserDto, loginUserDto, updateUserPasswordDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { UserDocument } from '@interfaces/users.interface';
import UserModel from '@models/users.model';
import { VerifyUser } from '@utils/twil';
import { isEmpty } from '@utils/util';
import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

class AuthService {
  public users = UserModel;

  public async signup(userData: CreateUserDto): Promise<void> {
    if (isEmpty(userData)) throw new HttpException(400, 'Your information is empty');
    let findUser: UserDocument;

    findUser = await this.users.findOne({
      email: userData.email,
    });
    if (findUser) throw new HttpException(409, `Account with email ${userData.email}  already exists`);

    findUser = await this.users.findOne({
      phoneNumber: userData.phoneNumber,
    });
    if (findUser) throw new HttpException(409, `Account with phoneNumber ${userData.phoneNumber} already exists`);

    // create new user
    const newUser: UserDocument = new this.users(userData);

    const user = _.pick(await newUser.save(), ['_id', 'email', 'phoneNumber', 'isAdmin']);
    await VerifyUser(newUser.phoneNumber);

    // SendSMS(newUser);
  }

  public async login(userData: loginUserDto): Promise<{ token: string; cookie: string; findUser: UserDocument; expiresIn: Number }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    let findUser: UserDocument;

    if (userData.phoneNumber) {
      findUser = await this.users.findOne({
        phoneNumber: userData.phoneNumber,
        isActive: true,
      });
    } else if (userData.identityNumber) {
      findUser = await this.users.findOne({
        identityNumber: userData.identityNumber,
        isActive: true,
      });
    } else if (userData.email) {
      findUser = await this.users.findOne({
        email: userData.email,
        isActive: true,
      });
    }
    if (!findUser) throw new HttpException(409, "Your login is either wrong or you're not active");

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "Your login is either wrong or you're not active");

    const tokenData: TokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    findUser = _.pick(findUser, ['_id', 'email', 'phoneNumber', 'firstName', 'lastName']);
    const token = tokenData.token;
    const expiresIn = tokenData.expiresIn;

    return { token, cookie, findUser, expiresIn };
  }

  public createToken(user: UserDocument): TokenData {
    const dataStoredInToken: DataStoredInToken = {
      id: user._id,
      email: user.email,
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

    const findUser = await this.users.findOne({ email: email });
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
