import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './app.database';
import { UsersService } from './services/users/users.service';
import { UserController } from './controllers/user/user.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/auth/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UsersService, AuthService, JwtStrategy],
})
export class AppModule {}
