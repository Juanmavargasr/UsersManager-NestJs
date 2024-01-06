import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from './models/user.model';
import { UsersService } from './services/users/users.service';

const dbUrl = process.env.MONGO_URI;

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserModel }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class DatabaseModule {}
