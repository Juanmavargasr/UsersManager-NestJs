import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { userRol } from 'src/models/user.model';

export class updateUserDto {
  @IsString()
  @IsNotEmpty()
  id: String;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullname: String;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: String;

  @MinLength(4)
  @MaxLength(12)
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  password: String;
}
