import { Field, ObjectType } from '@nestjs/graphql';
import { Tag } from '../schema/tag.schema';


@ObjectType()
export class TagDTO implements Tag {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  owner: string;

  @Field(() => String)
  label: string;

  @Field(() => Date, { nullable: true, defaultValue: Date.now })
  createAt: Date;

  @Field(() => Date, { nullable: true, defaultValue: Date.now })
  updateAt: Date;
}
