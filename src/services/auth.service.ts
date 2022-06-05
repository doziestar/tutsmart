import { SECRET_KEY } from '@config';
import DB from '@databases';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { IUser } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

class AuthService {
  public users = DB.Users;

  public async signup(userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, "We can't find your userData");

    // find if user already exists using email or phoneNumber
    const findUser: IUser = await this.users.findOne({
      where: {
        [userData.email ? 'email' : 'phoneNumber']: userData.email || userData.phoneNumber,
      },
    });
    if (findUser) throw new HttpException(409, `Your email ${userData.email}  or phoneNumber ${userData.phoneNumber} is already in use.`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: IUser = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: LoginUserDto): Promise<{ accessToken: TokenData; refreshToken: TokenData; findUser: IUser }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    // find if user already exists using email or phoneNumber
    const findUser = await this.users.findOne({
      where: {
        [userData.identityNumber ? 'email' : 'phoneNumber']: userData.identityNumber || userData.phoneNumber,
      },
    });

    if (!findUser) throw new HttpException(409, `Your email ${userData.identityNumber}  or phoneNumber ${userData.phoneNumber} seems to be invalid.`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Wrong credentials');

    //store refresh token in database
    findUser.refreshToken = this.refreshToken(findUser);
    await findUser.save();

    const accessToken = this.accessToken(findUser);
    const refreshToken = this.refreshToken(findUser);

    return { accessToken, refreshToken, findUser };
  }

  public async logout(userData: IUser): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: IUser = await this.users.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public accessToken(user: IUser): TokenData {
    const expiresIn: number = 60 * 60 * 24;
    const dataStoredInToken: DataStoredInToken = { id: user.id, expiresIn: expiresIn };
    const secretKey: string = SECRET_KEY;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public refreshToken(user: IUser): TokenData {
    const expiresIn: number = 60 * 60 * 24 * 7;
    const dataStoredInToken: DataStoredInToken = { id: user.id, expiresIn: expiresIn };
    const secretKey: string = SECRET_KEY;
    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public async revokeToken(userData: IUser): Promise<void> {
    const findUser = await this.users.findOne({ where: { id: userData.id } });
    if (!findUser) throw new HttpException(409, "You're not user");

    findUser.refreshToken = null;
    await findUser.save();
  }

  // public createCookie(tokenData: TokenData): string {
  //   return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  // }
}

export default AuthService;
