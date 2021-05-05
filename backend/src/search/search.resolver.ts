import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchTextInputDTO } from './dtos/input/search-text.input';
import { SearchDTO } from './dtos/search.dto';

@Resolver(() => SearchDTO)
export class SearchResolver {
  @Query(() => SearchDTO)
  async allTextSearchBookmark(
    @Args(SearchTextInputDTO.name) search: SearchTextInputDTO,
  ): Promise<SearchDTO> {
    return {
      results: [],
    };
  }
}
