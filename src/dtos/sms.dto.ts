import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class phoneDto {
  @IsPhoneNumber()
  phoneNumber?: string;
}

export class verifyDto {
  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  code: string;
}

export class sendIdDto {
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsString()
  identityNumber: string;

  @IsEmail()
  email: string;
}
