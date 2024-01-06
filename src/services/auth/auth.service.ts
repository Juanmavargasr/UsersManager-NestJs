import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { Connection, Model } from 'mongoose';
import { User, UserModel } from 'src/models/user.model';
import { loginAuthDto } from 'src/dtos/auth/login.auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private userModel: Model<User>;

  constructor(
    @InjectConnection() private connection: Connection,
    @Inject(JwtService) private jwtService: JwtService,
  ) {
    this.userModel = this.connection.model(User.name, UserModel);
  }
  async login(user: loginAuthDto) {
    const { email, password } = user;
    const foundUser = await this.userModel.findOne({ email });
    if (!foundUser) {
      throw new HttpException(
        'user or password are invalid',
        HttpStatus.FORBIDDEN,
      );
    }

    const isCorrectPassword = await compare(password, foundUser.password);

    if (!isCorrectPassword) {
      throw new HttpException(
        'user or password are invalid',
        HttpStatus.FORBIDDEN,
      );
    }

    const payload = { fullname: foundUser.fullname, rol: foundUser.rol };

    const token = await this.jwtService.sign(payload);

    const data = {
      user: payload,
      token,
    };
    return data;
  }
}
