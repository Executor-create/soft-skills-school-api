import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  sex: string;

  @Prop()
  course: number;

  @Prop()
  direction: string;

  @Prop()
  role: string;

  @Prop()
  token: string;

  @Prop()
  created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
