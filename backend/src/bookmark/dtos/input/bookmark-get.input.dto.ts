import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BookmarkGetInputDTO {
  @Field()
  bookmarkId: string;
}
