import { Field, InputType } from '@nestjs/graphql';
import { BookmarkCreateInputDTO } from './bookmark-create.input';

@InputType()
export class BookmarkEditInputDTO implements Partial<BookmarkCreateInputDTO> {
  @Field()
  _id: string;

  @Field(() => String, { nullable: true })
  original?: string;

  @Field(() => String, { nullable: true })
  note?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];
}
