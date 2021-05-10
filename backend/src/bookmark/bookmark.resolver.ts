import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookmarkService } from './bookmark.service';
import { BookmarkDTO } from './dtos/bookmark.dto';
import { BookmarkClearInput } from './dtos/input/bookmark-clear.input.dto';
import { BookmarkCreateInputDTO } from './dtos/input/bookmark-create.input';
import { BookmarkEditInputDTO } from './dtos/input/bookmark-edit.input.dto';

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

  @Query(() => BookmarkDTO)
  async getABookmark(
    @Args('bookmarkId') bookmarkId: string,
  ): Promise<BookmarkDTO> {
    return this.bookmarkService.getABookmark(bookmarkId);
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

  @Mutation(() => String)
  async clearTrash(@Args(BookmarkClearInput.name) command: BookmarkClearInput) {
    return this.bookmarkService.clearTrash(command);
  }
}
