import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UrlCreateInputDTO } from './dtos/input/url-create.input';
import { UrlEditInputDTO } from './dtos/input/url-edit.input.dto';
import { BookmarkDTO } from './dtos/bookmark.dto';
import { UrlsService } from './bookmark.service';

@Resolver(() => BookmarkDTO)
export class UrlsResolver {
  constructor(private readonly urlService: UrlsService) {}

  @Mutation(() => BookmarkDTO)
  async addUrls(
    @Args('UrlCreateInputDTO') urlCreateInputDTO: UrlCreateInputDTO,
  ): Promise<BookmarkDTO> {
    return this.urlService.addUrl(urlCreateInputDTO);
  }

  @Mutation(() => BookmarkDTO)
  async editUrls(
    @Args('UrlEditInputDTO') urlEditInputDTO: UrlEditInputDTO,
  ): Promise<BookmarkDTO> {
    return this.urlService.editUrl(urlEditInputDTO);
  }
}
