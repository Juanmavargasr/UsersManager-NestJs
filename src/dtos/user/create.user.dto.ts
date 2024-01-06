import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { userRol } from 'src/models/user.model';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  id: String;

  @IsString()
  @IsNotEmpty()
  fullname: String;

  @IsEmail()
  @IsNotEmpty()
  email: String;

  @MinLength(4)
  @MaxLength(12)
  @IsNotEmpty()
  @IsString()
  password: String;
}
