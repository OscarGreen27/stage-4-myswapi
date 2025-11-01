import { IsString } from 'class-validator';

export class UserAuthDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;
}
