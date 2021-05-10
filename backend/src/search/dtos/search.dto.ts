import { Field, ObjectType } from '@nestjs/graphql';
import { BookmarkDTO } from '../../bookmark/dtos/bookmark.dto';

@ObjectType()
export class BookmarkDTOSearch extends BookmarkDTO {
  @Field(() => [String])
  unwindTags: string[];
}

@ObjectType()
export class SearchDTO {
  @Field(() => [BookmarkDTOSearch], { defaultValue: [] })
  results: BookmarkDTO[] | { unwindTag: string[] };
}
