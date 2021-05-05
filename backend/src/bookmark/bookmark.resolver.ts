import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { BookmarkCreateInputDTO } from './dtos/input/bookmark-create.input';
import { BookmarkEditInputDTO } from './dtos/input/bookmark-edit.input.dto';
import { BookmarkDTO } from './dtos/bookmark.dto';
import { BookmarkService } from './bookmark.service';

@Resolver(() => BookmarkDTO)
export class BookmarkResolver {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Query(() => [BookmarkDTO])
  async getRecentBookmark(
    @Args('skip', { defaultValue: 0 }) skip: number,
    @Args('limit', { defaultValue: 100 }) limit: number,
    @Args('userId') userId: string,
  ): Promise<BookmarkDTO[]> {
    return this.bookmarkService.getRecentBookmark(userId, skip, limit);
  }
  @Mutation(() => BookmarkDTO)
  async addBookmark(
    @Args(BookmarkCreateInputDTO.name)
    bookmarkCreateInputDTO: BookmarkCreateInputDTO,
  ): Promise<BookmarkDTO> {
    return this.bookmarkService.addBookmark(bookmarkCreateInputDTO);
  }

  @Mutation(() => BookmarkDTO)
  async editBookmark(
    @Args(BookmarkEditInputDTO.name) bookmarkEditInputDTO: BookmarkEditInputDTO,
  ): Promise<BookmarkDTO> {
    return this.bookmarkService.editBookmark(bookmarkEditInputDTO);
  }
}
