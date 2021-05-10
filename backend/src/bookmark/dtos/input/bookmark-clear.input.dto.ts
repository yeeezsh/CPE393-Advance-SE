import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BookmarkClearInput {
  @Field()
  owner: string;
}
