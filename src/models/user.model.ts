import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum userRol {
  admin = 'admin',
  user = 'user',
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  id: String;

  @Prop({ required: true })
  fullname: String;

  @Prop({ required: true })
  email: String;

  @Prop({ required: true })
  password: String;

  @Prop({ default: userRol.user })
  rol: userRol;
}

export const UserModel = SchemaFactory.createForClass(User);
