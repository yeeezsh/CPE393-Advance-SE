import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { UrlCreateInputDTO } from './dtos/input/url-create.input';
import { UrlEditInputDTO } from './dtos/input/url-edit.input.dto';
import { MOCK_TAG_MODEL } from './tests/mock.tag.model';
import { MOCK_URL_MODEL, MOCK_URL_VALUE } from './tests/mock.url.model';
import { UrlsService } from './urls.service';

describe('UrlsService', () => {
  let service: UrlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MOCK_URL_MODEL, MOCK_TAG_MODEL, UrlsService],
    }).compile();

    service = module.get<UrlsService>(UrlsService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should able to call create when using addUrl', async () => {
    const MOCK_URL_INPUT = {
      owner: Types.ObjectId().toHexString(),
      original: 'http://google.co.th',
      note: 'note',
      tags: [],
    } as UrlCreateInputDTO;

    await service.addUrl(MOCK_URL_INPUT);
    const model = jest.spyOn(MOCK_URL_VALUE, 'create');
    expect(model).toBeCalled();
  });

  it('Should able to call findByIdAndUpdate when using editUrl', async () => {
    const MOCK_URL_INPUT = {
      owner: Types.ObjectId().toHexString(),
      _id: Types.ObjectId().toHexString(),
      original: 'http://google.co.th',
      note: 'note',
      tags: [],
    } as UrlEditInputDTO;

    await service.editUrl(MOCK_URL_INPUT);
    const model = jest.spyOn(MOCK_URL_VALUE, 'findByIdAndUpdate');
    expect(model).toBeCalled();
  });

  it('Should call find, sort, skip, limit, lean when call getRecentUrl', async () => {
    const MOCK_OWNER = Types.ObjectId().toHexString();
    await service.getRecentUrl(MOCK_OWNER, 0);
    expect(jest.spyOn(MOCK_URL_VALUE, 'find')).toBeCalled();
    expect(jest.spyOn(MOCK_URL_VALUE, 'sort')).toBeCalled();
    expect(jest.spyOn(MOCK_URL_VALUE, 'skip')).toBeCalled();
    expect(jest.spyOn(MOCK_URL_VALUE, 'limit')).toBeCalled();
    expect(jest.spyOn(MOCK_URL_VALUE, 'lean')).toBeCalled();
  });
});
