import { Field, InputType } from '@nestjs/graphql';
import { Bookmark } from '../../schema/bookmark.schema';

@InputType()
export class BookmarkCreateInputDTO
  implements Pick<Bookmark, 'owner' | 'original' | 'note' | 'tags'> {
  @Field()
  owner: string;

  @Field()
  original: string;

  @Field()
  note: string;

  @Field(() => [String])
  tags: string[];
}
