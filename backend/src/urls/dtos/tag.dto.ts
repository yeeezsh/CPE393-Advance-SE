import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { TagType } from '../@types/tag-type.type';
import { Tag } from '../schema/tag.schema';

registerEnumType(TagType, { name: 'TagType' });

@ObjectType()
export class TagDTO implements Tag {
  @Field(() => String)
  owner: Types.ObjectId;

  @Field(() => String)
  label: string;

  @Field(() => TagType)
  type: TagType;

  @Field(() => Date, { nullable: true, defaultValue: Date.now })
  createAt: Date;

  @Field(() => Date, { nullable: true, defaultValue: Date.now })
  updateAt: Date;
}
