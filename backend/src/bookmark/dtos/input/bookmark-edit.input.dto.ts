import { Field, InputType } from '@nestjs/graphql';
import { BookmarkCreateInputDTO } from './bookmark-create.input';

@InputType()
export class BookmarkEditInputDTO implements Partial<BookmarkCreateInputDTO> {
  @Field()
  _id: string;

  @Field(() => String)
  original: string;

  @Field(() => String)
  note: string;

  @Field(() => [String])
  tags: string[];
}
