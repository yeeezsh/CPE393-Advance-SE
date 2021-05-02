import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UrlCreateInputDTO } from './dtos/input/url-create.input';
import { UrlEditInputDTO } from './dtos/input/url-edit.input.dto';
import { BookmarkDTO } from './dtos/bookmark.dto';
import { BookmarkService } from './bookmark.service';

@Resolver(() => BookmarkDTO)
export class BookmarkResolver {
  constructor(private readonly urlService: BookmarkService) {}

  @Mutation(() => BookmarkDTO)
  async addUrls(
    @Args(UrlCreateInputDTO.name) urlCreateInputDTO: UrlCreateInputDTO,
  ): Promise<BookmarkDTO> {
    return this.urlService.addUrl(urlCreateInputDTO);
  }

  @Mutation(() => BookmarkDTO)
  async editUrls(
    @Args(UrlEditInputDTO.name) urlEditInputDTO: UrlEditInputDTO,
  ): Promise<BookmarkDTO> {
    return this.urlService.editUrl(urlEditInputDTO);
  }
}
