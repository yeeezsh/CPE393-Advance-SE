import { Field, ObjectType } from '@nestjs/graphql';
import { Bookmark } from '../schema/bookmark.schema';

@ObjectType()
export class BookmarkDTO implements Bookmark {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  owner: string;

  @Field(() => String)
  original: string;

  @Field(() => String)
  domain: string;

  @Field(() => String)
  note: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => Date, { nullable: true, defaultValue: Date.now })
  createAt: Date;

  @Field(() => Date, { nullable: true, defaultValue: Date.now })
  updateAt: Date;
}
