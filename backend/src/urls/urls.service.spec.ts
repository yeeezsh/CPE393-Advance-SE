import { Test, TestingModule } from '@nestjs/testing';
import { MOCK_TAG_MODEL } from './tests/mock.tag.model';
import { MOCK_URL_MODEL } from './tests/mock.url.model';
import { UrlsService } from './urls.service';

describe('UrlsService', () => {
  let service: UrlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MOCK_URL_MODEL, MOCK_TAG_MODEL, UrlsService],
    }).compile();

    service = module.get<UrlsService>(UrlsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
