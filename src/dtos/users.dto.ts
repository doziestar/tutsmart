import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class LoginUserDto {
  @IsString()
  public identityNumber?: string;

  @IsString()
  public phoneNumber?: string;

  @IsString()
  public password: string;
}
