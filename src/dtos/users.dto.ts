import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsPhoneNumber()
  public phoneNumber: string;
}

export class loginUserDto {
  @IsPhoneNumber()
  public phoneNumber?: string;

  @IsEmail()
  public email?: string;

  @IsString()
  public identityNumber?: string;

  @IsString()
  public password: string;
}

export class userIdDto {
  @IsString()
  public userId: string;
}

export class updateUserDto {
  @IsString()
  firstName?: String;

  @IsString()
  lastName?: String;
}

export class updateUserPasswordDto {
  @IsString()
  public oldPassword: string;

  @IsString()
  public newPassword: string;

  @IsString()
  public confirmPassword: string;
}

export class updateUserPhoneNumberDto {
  @IsString()
  public phoneNumber: string;
}

export class updateProfileDto {
  @IsString()
  public bio: String;

  @IsString()
  public avatar: String;

  @IsString()
  public cover: String;

  @IsString()
  public dateOfBirth: Date;
}

export class verifySignInPhoneNumberDto {
  @IsString()
  public phoneNumber: string;

  @IsString()
  public code: string;
}
