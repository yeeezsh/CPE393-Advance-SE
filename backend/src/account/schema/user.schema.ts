import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  displayName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, default: Date.now })
  createAt: Date;

  @Prop({ default: undefined })
  deactivate?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
