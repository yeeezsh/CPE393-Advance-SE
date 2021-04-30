import { Query, Resolver } from '@nestjs/graphql';
import { UrlDTO } from './dtos/url.dto';

@Resolver(() => UrlDTO)
export class UrlsResolver {
  @Query(() => UrlDTO)
  async getUrls() {
    return;
  }
}
