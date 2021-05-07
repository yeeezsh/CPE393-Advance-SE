import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TagAddToBookmarkDTO {
  @Field()
  bookmarkId: string;
  @Field()
  _id: string;
}
