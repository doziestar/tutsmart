import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
