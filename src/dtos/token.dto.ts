import { IsString } from 'class-validator';

export class TokenDto {
  @IsString()
  publicKey: string;

  @IsString()
  privateKey: string;

  @IsString()
  token: string;

  @IsString()
  userId: string;
}
