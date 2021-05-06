import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { SystemTagType } from './@types/systemTag-type.type';
import { TagType } from './@types/tag-type.type';
import { BookmarkService } from './bookmark.service';
import { TagCreateInputDTO } from './dtos/input/tag-create.input.dto';
import { TagEditInputDTO } from './dtos/input/tag-edit.input.dto';
import { BookmarkGetInputDTO } from './dtos/input/bookmark-get.input.dto';
import { TagService } from './tag.service';
import {
  MOCK_BOOKMARK_DOCUMENT,
  MOCK_BOOKMARK_MODEL,
} from './tests/mock.bookmark.model';
import { MOCK_TAG_MODEL, MOCK_TAG_VALUE } from './tests/mock.tag.model';

describe('Tags Service', () => {
  let service: TagService;

  const MOCK_BOOKMARK_ID = Types.ObjectId().toHexString();
  const MOCK_OWNER_ID = Types.ObjectId().toHexString();

  const MOCK_BOOKMARK_SERVICE = {
    getABookmark: () => ({
      ...MOCK_BOOKMARK_DOCUMENT,
      tags: ['tagA', 'tagB'],
      _id: MOCK_BOOKMARK_ID,
      _owner: MOCK_OWNER_ID,
    }),
    editBookmark: (a: any) => a,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MOCK_BOOKMARK_MODEL,
        MOCK_TAG_MODEL,
        TagService,
        BookmarkService,
      ],
    })
      .overrideProvider(BookmarkService)
      .useValue(MOCK_BOOKMARK_SERVICE)
      .compile();

    service = module.get<TagService>(TagService);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should able to call create when using addBookmark', async () => {
    const MOCK_BOOKMARK_INPUT = {
      owner: Types.ObjectId().toHexString(),
      label: 'default',
      type: TagType.user,
    } as TagCreateInputDTO;

    await service.createTag(MOCK_BOOKMARK_INPUT);
    const model = jest.spyOn(MOCK_TAG_VALUE, 'create');
    expect(model).toBeCalled();
  });

  it('Should able to call findByIdAndUpdate when using editBookmark', async () => {
    const MOCK_BOOKMARK_INPUT = {
      owner: Types.ObjectId().toHexString(),
      label: 'test lable',
      type: TagType.user,
    } as TagEditInputDTO;

    await service.editTag(MOCK_BOOKMARK_INPUT);
    const model = jest.spyOn(MOCK_TAG_VALUE, 'findByIdAndUpdate');
    expect(model).toBeCalled();
  });

  it('Should able to addTag when call setArchiveTag', async () => {
    const MOCK_TAG_SET_ARCHIVE_INPUT = {
      bookmarkId: Types.ObjectId().toHexString(),
    } as BookmarkGetInputDTO;
    const now = new Date();

    const MOCK_RETURN_BOOKMARK_DOC = {
      _id: MOCK_BOOKMARK_ID,
      owner: MOCK_OWNER_ID,
      original: 'https://docs.google.com',
      domain: 'docs.google.com',
      note: '',
      tags: ['tagA', 'tagB', SystemTagType.archive],
      createAt: now,
      updateAt: now,
    };
    const returnVal = await service.setArchiveTag(MOCK_TAG_SET_ARCHIVE_INPUT);
    expect(returnVal.tags).toEqual(MOCK_RETURN_BOOKMARK_DOC.tags);
  });

  // it('Should able to return setArchiveTag when call setArchiveTag', async () => {
  //   const MOCK_TAG_SET_ARCHIVE_INPUT = {
  //     bookmarkId: Types.ObjectId().toHexString(),
  //   } as TagSetArchiveInputDTO;
  //   const now = new Date();

  //   const MOCK_RETURN_BOOKMARK_DOC = {
  //     _id: MOCK_BOOKMARK_ID,
  //     owner: MOCK_OWNER_ID,
  //     original: 'https://docs.google.com',
  //     domain: 'docs.google.com',
  //     note: '',
  //     tags: ['tagA', 'tagB', SystemTagType.archive],
  //     createAt: now,
  //     updateAt: now,
  //   };
  //   const returnVal = await service.setArchiveTag(MOCK_TAG_SET_ARCHIVE_INPUT);
  //   expect(returnVal.tags).toEqual(MOCK_RETURN_BOOKMARK_DOC.tags);
  // });
});
