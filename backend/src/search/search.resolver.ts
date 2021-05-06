import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchTextInputDTO } from './dtos/input/search-text.input';
import { SearchDTO } from './dtos/search.dto';
import { SearchService } from './search.service';

@Resolver(() => SearchDTO)
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => SearchDTO)
  async allTextSearchBookmark(
    @Args(SearchTextInputDTO.name) search: SearchTextInputDTO,
  ): Promise<SearchDTO> {
    return this.searchService.allTextSearch(search);
  }
}
