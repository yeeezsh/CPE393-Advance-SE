import { Field, ObjectType } from '@nestjs/graphql';
import { BookmarkDTO } from '../../bookmark/dtos/bookmark.dto';

@ObjectType()
export class SearchDTO {
  @Field(() => [BookmarkDTO], { defaultValue: [] })
  results: BookmarkDTO[];
}
