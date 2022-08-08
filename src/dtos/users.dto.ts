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

export class LoginUserDto {
  @IsPhoneNumber()
  public phoneNumber?: string;

  @IsEmail()
  public email?: string;

  @IsString()
  public identityNumber?: string;

  @IsString()
  public password: string;

  @IsString()
  public bvn?: string;

  @IsString()
  public nin?: string;
}

export class UserIdDto {
  @IsString()
  public userId: string;
}

export class UpdateUserDto {
  @IsString()
  firstName?: String;

  @IsString()
  lastName?: String;
}

export class UpdateUserPasswordDto {
  @IsString()
  public oldPassword: string;

  @IsString()
  public newPassword: string;

  @IsString()
  public confirmPassword: string;
}

export class UpdateUserPhoneNumberDto {
  @IsString()
  public phoneNumber: string;
}

export class UpdateProfileDto {
  @IsString()
  public bio: String;

  @IsString()
  public avatar: String;

  @IsString()
  public cover: String;

  @IsString()
  public dateOfBirth: Date;
}

export class VerifySignInPhoneNumberDto {
  @IsString()
  public phoneNumber: string;

  @IsString()
  public code: string;
}

export class GovernmentIdDto {
  @IsString()
  public governmentId: string;

  @IsString()
  public userId: string;

  @IsString()
  public type: string;
}
