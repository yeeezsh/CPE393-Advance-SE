import { Test, TestingModule } from '@nestjs/testing';
import { MOCK_BOOKMARK_MODEL } from '../bookmark/tests/mock.bookmark.model';
import { MOCK_TAG_MODEL } from '../bookmark/tests/mock.tag.model';
import { SearchService } from './search.service';

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
});
