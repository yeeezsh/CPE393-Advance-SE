import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { BookmarkCreateInputDTO } from './dtos/input/bookmark-create.input';
import { BookmarkEditInputDTO } from './dtos/input/bookmark-edit.input.dto';
import { MOCK_TAG_MODEL } from './tests/mock.tag.model';
import { MOCK_URL_MODEL, MOCK_URL_VALUE } from './tests/mock.url.model';
import { BookmarkService } from './bookmark.service';

describe('Bookmark Service', () => {
  let service: BookmarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MOCK_URL_MODEL, MOCK_TAG_MODEL, BookmarkService],
    }).compile();

    service = module.get<BookmarkService>(BookmarkService);
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
    } as BookmarkCreateInputDTO;

    await service.addBookmark(MOCK_URL_INPUT);
    const model = jest.spyOn(MOCK_URL_VALUE, 'create');
    expect(model).toBeCalled();
  });

  it('Should able to call findById and save when using editBookmark', async () => {
    const MOCK_URL_INPUT = {
      owner: Types.ObjectId().toHexString(),
      _id: Types.ObjectId().toHexString(),
      original: 'http://google.co.th',
      note: 'note',
      tags: [],
    } as BookmarkEditInputDTO;

    await service.editBookmark(MOCK_URL_INPUT);
    const findById = jest.spyOn(MOCK_URL_VALUE, 'findById');
    expect(findById).toBeCalled();
    const save = jest.spyOn(MOCK_URL_VALUE, 'save');
    expect(save).toBeCalled();
  });

  it('Should call find, sort, skip, limit, lean when call getRecentUrl', async () => {
    const MOCK_OWNER = Types.ObjectId().toHexString();
    await service.getRecentBookmark(MOCK_OWNER, 0);
    expect(jest.spyOn(MOCK_URL_VALUE, 'find')).toBeCalled();
    expect(jest.spyOn(MOCK_URL_VALUE, 'sort')).toBeCalled();
    expect(jest.spyOn(MOCK_URL_VALUE, 'skip')).toBeCalled();
    expect(jest.spyOn(MOCK_URL_VALUE, 'limit')).toBeCalled();
    expect(jest.spyOn(MOCK_URL_VALUE, 'lean')).toBeCalled();
  });
});