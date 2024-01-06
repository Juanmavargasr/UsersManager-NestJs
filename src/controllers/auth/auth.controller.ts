import {
  Controller,
  Post,
  Body,
  Res,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { loginAuthDto } from 'src/dtos/auth/login.auth.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(
    // @Res() response: Response,
    @Body(new ValidationPipe()) dataUserLogin: loginAuthDto,
  ) {
    console.log(dataUserLogin);
    return this.authService.login(dataUserLogin);
  }
}
