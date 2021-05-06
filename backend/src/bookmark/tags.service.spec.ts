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
import {
  MOCK_TAG_DOCUMENT,
  MOCK_TAG_MODEL,
  MOCK_TAG_VALUE,
} from './tests/mock.tag.model';
import { TagAddToBookmarkDTO } from './dtos/input/tag-addToBookmark.input.dto';

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

  it('Should able to add archive/delete Tag when call setArchiveTag/ deleteTag', async () => {
    const MOCK_TAG_SET_ARCHIVE_INPUT = {
      bookmarkId: Types.ObjectId().toHexString(),
    } as BookmarkGetInputDTO;
    const now = new Date();

    const MOCK_RETURN_BOOKMARK_DOC_ARCHIVE = {
      _id: MOCK_BOOKMARK_ID,
      owner: MOCK_OWNER_ID,
      original: 'https://docs.google.com',
      domain: 'docs.google.com',
      note: '',
      tags: ['tagA', 'tagB', SystemTagType.archive],
      createAt: now,
      updateAt: now,
    };

    const MOCK_RETURN_BOOKMARK_DOC_DELETE = {
      _id: MOCK_BOOKMARK_ID,
      owner: MOCK_OWNER_ID,
      original: 'https://docs.google.com',
      domain: 'docs.google.com',
      note: '',
      tags: ['tagA', 'tagB', SystemTagType.delete],
      createAt: now,
      updateAt: now,
    };
    const returnArchive = await service.setArchiveTag(
      MOCK_TAG_SET_ARCHIVE_INPUT,
    );
    expect(returnArchive.tags).toEqual(MOCK_RETURN_BOOKMARK_DOC_ARCHIVE.tags);
    const returnDelete = await service.deleteTag(MOCK_TAG_SET_ARCHIVE_INPUT);
    expect(returnDelete.tags).toEqual(MOCK_RETURN_BOOKMARK_DOC_DELETE.tags);
  });

  it('Should able to distinct tag  when call setArchiveTag/deleteTag', async () => {
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
      tags: ['tagA', 'tagB', SystemTagType.archive, SystemTagType.delete],
      createAt: now,
      updateAt: now,
    };

    jest.spyOn(MOCK_BOOKMARK_SERVICE, 'getABookmark').mockReturnValue({
      ...MOCK_BOOKMARK_DOCUMENT,
      tags: ['tagA', 'tagB', SystemTagType.archive, SystemTagType.delete],
      _id: MOCK_BOOKMARK_ID,
      _owner: MOCK_OWNER_ID,
    });
    const returnArchive = await service.setArchiveTag(
      MOCK_TAG_SET_ARCHIVE_INPUT,
    );
    const returnDelete = await service.deleteTag(MOCK_TAG_SET_ARCHIVE_INPUT);
    expect(returnArchive.tags).toEqual(MOCK_RETURN_BOOKMARK_DOC.tags);
    expect(returnDelete.tags).toEqual(MOCK_RETURN_BOOKMARK_DOC.tags);
  });

  it('Should be able to add tag to bookmark when call addTagToBookmark', async () => {
    const now = new Date();

    const MOCK_RETURN_BOOKMARK_DOC = {
      _id: MOCK_BOOKMARK_ID,
      owner: MOCK_OWNER_ID,
      original: 'https://docs.google.com',
      domain: 'docs.google.com',
      note: '',
      tags: [
        'tagA',
        'tagB',
        SystemTagType.archive,
        SystemTagType.delete,
        MOCK_TAG_DOCUMENT._id,
      ],
      createAt: now,
      updateAt: now,
    };

    const MOCK_TAG_TO_ADD_BOOKMARK = {
      bookmarkId: MOCK_BOOKMARK_ID,
      _id: MOCK_TAG_DOCUMENT._id,
    } as TagAddToBookmarkDTO;

    const returnValue = await service.addTagToBookmark(
      MOCK_TAG_TO_ADD_BOOKMARK,
    );
    expect(MOCK_RETURN_BOOKMARK_DOC.tags).toEqual(returnValue.tags);
  });
});
