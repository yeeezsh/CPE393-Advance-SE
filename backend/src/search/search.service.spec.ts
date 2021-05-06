import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import {
  MOCK_BOOKMARK_MODEL,
  MOCK_BOOKMARK_VALUE,
} from '../bookmark/tests/mock.bookmark.model';
import { MOCK_TAG_MODEL } from '../bookmark/tests/mock.tag.model';
import { SearchFilterTag } from './dtos/input/search-filter-tag.input';
import { SearchInputDTO } from './dtos/input/search.input';
import { SearchService } from './search.service';

const MOCK_SEARCH_INPUT: SearchInputDTO = {
  owner: Types.ObjectId().toHexString(),
  tags: [],
  text: 'search',
};

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MOCK_BOOKMARK_MODEL, MOCK_TAG_MODEL, SearchService],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('allTextSearch should call aggregate fn', () => {
    const fn = jest.spyOn(MOCK_BOOKMARK_VALUE, 'aggregate');
    service.allTextSearch(MOCK_SEARCH_INPUT);
    expect(fn).toBeCalled();
  });

  it('filterByTag should call aggregate fn', () => {
    const fn = jest.spyOn(MOCK_BOOKMARK_VALUE, 'aggregate');
    service.filterByTag(MOCK_SEARCH_INPUT as SearchFilterTag);
    expect(fn).toBeCalled();
  });
});
