import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';

export class loginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: String;

  @MinLength(4)
  @MaxLength(12)
  @IsNotEmpty()
  @IsString()
  password: String;
}
