import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from '../../account/schema/user.schema';

export type TagDocument = Tag & Document;

@Schema()
export class Tag {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  owner: string;

  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  label: string;

  @Prop({ required: true, default: Date.now })
  createAt: Date;

  @Prop({ required: true, default: Date.now })
  updateAt: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
