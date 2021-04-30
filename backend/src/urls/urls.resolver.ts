import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UrlCreateInputDTO } from './dtos/input/url-create.input';
import { UrlEditInputDTO } from './dtos/input/url-edit.input.dto';
import { UrlDTO } from './dtos/url.dto';
import { UrlsService } from './urls.service';

@Resolver(() => UrlDTO)
export class UrlsResolver {
  constructor(private readonly urlService: UrlsService) {}

  @Mutation(() => UrlDTO)
  async addUrls(
    @Args('UrlCreateInputDTO') urlCreateInputDTO: UrlCreateInputDTO,
  ): Promise<UrlDTO> {
    return this.urlService.addUrl(urlCreateInputDTO);
  }

  @Mutation(() => UrlDTO)
  async editUrls(
    @Args('UrlEditInputDTO') urlEditInputDTO: UrlEditInputDTO,
  ): Promise<UrlDTO> {
    return this.urlService.editUrl(urlEditInputDTO);
  }
}
