import { Test, TestingModule } from '@nestjs/testing';
import { MOCK_TAG_MODEL } from '../bookmark/tests/mock.tag.model';
import { MOCK_URL_MODEL } from '../bookmark/tests/mock.url.model';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MOCK_URL_MODEL, MOCK_TAG_MODEL, SearchService],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
