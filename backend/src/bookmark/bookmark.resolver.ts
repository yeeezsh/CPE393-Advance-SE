import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { BookmarkCreateInputDTO } from './dtos/input/bookmark-create.input';
import { BookmarkEditInputDTO } from './dtos/input/bookmark-edit.input.dto';
import { BookmarkDTO } from './dtos/bookmark.dto';
import { BookmarkService } from './bookmark.service';

@Resolver(() => BookmarkDTO)
export class BookmarkResolver {
  constructor(private readonly urlService: BookmarkService) {}

  @Query(() => [BookmarkDTO])
  async getRecentBookmark(
    @Args('skip', { defaultValue: 0 }) skip: number,
    @Args('limit', { defaultValue: 100 }) limit: number,
    @Args('userId') userId: string,
  ): Promise<BookmarkDTO[]> {
    return this.urlService.getRecentBookmark(userId, skip, limit);
  }
  @Mutation(() => BookmarkDTO)
  async addBookmark(
    @Args(BookmarkCreateInputDTO.name)
    urlCreateInputDTO: BookmarkCreateInputDTO,
  ): Promise<BookmarkDTO> {
    return this.urlService.addBookmark(urlCreateInputDTO);
  }

  @Mutation(() => BookmarkDTO)
  async editBookmark(
    @Args(BookmarkEditInputDTO.name) urlEditInputDTO: BookmarkEditInputDTO,
  ): Promise<BookmarkDTO> {
    return this.urlService.editBookmark(urlEditInputDTO);
  }
}
