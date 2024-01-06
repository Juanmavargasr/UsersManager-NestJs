import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';

import { Connection, Model } from 'mongoose';
import { User, UserModel } from 'src/models/user.model';
import { createUserDto } from 'src/dtos/user/create.user.dto';
import { updateUserDto } from 'src/dtos/user/update.user.dto';

@Injectable()
export class UsersService {
  private userModel: Model<User>;

  constructor(@InjectConnection() private connection: Connection) {
    this.userModel = this.connection.model(User.name, UserModel);
  }
  async createUser(user: createUserDto): Promise<User> {
    const { password } = user;

    const hashedPassword = await hash(password, 10);

    user = {
      ...user,
      password: hashedPassword,
    };

    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async updateUser(id: String, updatedUser: updateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, updatedUser, {
        new: true,
      })
      .exec();
  }

  async findUsers() {
    const foundUsers = this.userModel.find();
    return foundUsers;
  }

  async findUserById(id: string) {
    const foundUser = this.userModel.findById(id);
    return foundUser;
  }

  async deleteUser(id: String) {
    const deletedUser = this.userModel.findByIdAndDelete(id);
    return deletedUser;
  }
}
