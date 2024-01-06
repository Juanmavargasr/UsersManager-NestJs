import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Get,
  Delete,
  Res,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from 'src/services/users/users.service';
import { createUserDto } from 'src/dtos/user/create.user.dto';
import { updateUserDto } from 'src/dtos/user/update.user.dto';
import { JwtAuthGuard } from 'src/utils/auth/jwt-auth.guard';
import { AdminGuard } from 'src/utils/auth/admin-auth.guard';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  async createUser(
    @Res() response: Response,
    @Body(new ValidationPipe()) payload: createUserDto,
  ) {
    try {
      const createdUser = await this.usersService.createUser(payload);

      const userResponse = {
        id: createdUser.id,
        fullname: createdUser.fullname,
        email: createdUser.email,
      };

      response.status(HttpStatus.CREATED).json({
        message: `User ${userResponse.fullname} successfully created`,
        user: userResponse,
      });
    } catch (error) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateUser(
    @Res() response: Response,
    @Body(new ValidationPipe()) payload: updateUserDto,
    @Param('id') id: String,
  ) {
    try {
      const updatedUser = await this.usersService.updateUser(id, payload);

      const userResponse = {
        id: updatedUser.id,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
      };

      response.status(HttpStatus.ACCEPTED).json({
        message: 'User successfully updated',
        user: userResponse,
      });
    } catch (error) {
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findUsers(@Res() response: Response) {
    try {
      const foundUsers = await this.usersService.findUsers();

      response.status(HttpStatus.OK).json({
        message: 'Users successfully found',
        user: foundUsers,
      });
    } catch (error) {
      throw new HttpException(
        'Failed to find users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  async findUserById(@Res() response: Response, @Param('id') id: string) {
    try {
      const foundUser = await this.usersService.findUserById(id);

      const userResponse = {
        id: foundUser.id,
        fullname: foundUser.fullname,
        email: foundUser.email,
        rol: foundUser.rol,
      };

      response.status(HttpStatus.OK).json({
        message: 'User successfully found',
        user: userResponse,
      });
    } catch (error) {
      throw new HttpException(
        'Failed to find users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteUser(@Res() response: Response, @Param('id') id: string) {
    try {
      const deletedUser = await this.usersService.deleteUser(id);
      response.status(HttpStatus.OK).json({
        message: `User successfully deleted`,
      });
    } catch (error) {
      throw new HttpException(
        'Failed to find users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
