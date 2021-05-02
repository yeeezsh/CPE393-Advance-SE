import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BookmarkCreateInputDTO } from './dtos/input/bookmark-create.input';
import { BookmarkEditInputDTO } from './dtos/input/bookmark-edit.input.dto';
import { BookmarkDTO } from './dtos/bookmark.dto';
import { BookmarkService } from './bookmark.service';

@Resolver(() => BookmarkDTO)
export class BookmarkResolver {
  constructor(private readonly urlService: BookmarkService) {}

  @Mutation(() => BookmarkDTO)
  async addUrls(
    @Args(BookmarkCreateInputDTO.name)
    urlCreateInputDTO: BookmarkCreateInputDTO,
  ): Promise<BookmarkDTO> {
    return this.urlService.addBookmark(urlCreateInputDTO);
  }

  @Mutation(() => BookmarkDTO)
  async editUrls(
    @Args(BookmarkEditInputDTO.name) urlEditInputDTO: BookmarkEditInputDTO,
  ): Promise<BookmarkDTO> {
    return this.urlService.editBookmark(urlEditInputDTO);
  }
}
