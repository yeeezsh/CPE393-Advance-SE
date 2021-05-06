import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { BookmarkService } from './bookmark.service';
import { BookmarkCreateInputDTO } from './dtos/input/bookmark-create.input';
import { BookmarkEditInputDTO } from './dtos/input/bookmark-edit.input.dto';
import {
  MOCK_BOOKMARK_MODEL,
  MOCK_BOOKMARK_VALUE
} from './tests/mock.bookmark.model';
import { MOCK_TAG_MODEL } from './tests/mock.tag.model';

describe('Bookmark Service', () => {
  let service: BookmarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MOCK_BOOKMARK_MODEL, MOCK_TAG_MODEL, BookmarkService],
    }).compile();

    service = module.get<BookmarkService>(BookmarkService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should able to call create when using addBookmark', async () => {
    const MOCK_BOOKMARK_INPUT = {
      owner: Types.ObjectId().toHexString(),
      original: 'http://google.co.th',
      note: 'note',
      tags: [],
    } as BookmarkCreateInputDTO;

    await service.addBookmark(MOCK_BOOKMARK_INPUT);
    const model = jest.spyOn(MOCK_BOOKMARK_VALUE, 'create');
    expect(model).toBeCalled();
  });

  it('Should able to call findById and save when using editBookmark', async () => {
    const MOCK_BOOKMARK_INPUT = {
      owner: Types.ObjectId().toHexString(),
      _id: Types.ObjectId().toHexString(),
      original: 'http://google.co.th',
      note: 'note',
      tags: [],
    } as BookmarkEditInputDTO;

    await service.editBookmark(MOCK_BOOKMARK_INPUT);
    const findById = jest.spyOn(MOCK_BOOKMARK_VALUE, 'findById');
    expect(findById).toBeCalled();
    const save = jest.spyOn(MOCK_BOOKMARK_VALUE, 'save');
    expect(save).toBeCalled();
  });

  it('Should call find, sort, skip, limit, lean when call getRecentUrl', async () => {
    const MOCK_OWNER = Types.ObjectId().toHexString();
    await service.getRecentBookmark(MOCK_OWNER, 0);
    expect(jest.spyOn(MOCK_BOOKMARK_VALUE, 'find')).toBeCalled();
    expect(jest.spyOn(MOCK_BOOKMARK_VALUE, 'sort')).toBeCalled();
    expect(jest.spyOn(MOCK_BOOKMARK_VALUE, 'skip')).toBeCalled();
    expect(jest.spyOn(MOCK_BOOKMARK_VALUE, 'limit')).toBeCalled();
    expect(jest.spyOn(MOCK_BOOKMARK_VALUE, 'lean')).toBeCalled();
  });

  it('Should call findById when using getABookMark', async () => {
    const MOCK_BOOKMARK_ID = Types.ObjectId().toHexString();
    await service.getABookmark(MOCK_BOOKMARK_ID);
    const findById = jest.spyOn(MOCK_BOOKMARK_VALUE, 'findById');
    expect(findById).toBeCalled();
  });
});
