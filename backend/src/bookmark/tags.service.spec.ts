import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { TagType } from './@types/tag-type.type';
import { BookmarkService } from './bookmark.service';
import { TagCreateInputDTO } from './dtos/input/tag-create.input.dto';
import { TagEditInputDTO } from './dtos/input/tag-edit.input.dto';
import { TagService } from './tag.service';
import { MOCK_BOOKMARK_MODEL } from './tests/mock.bookmark.model';
import { MOCK_TAG_MODEL, MOCK_TAG_VALUE } from './tests/mock.tag.model';

describe('Tags Service', () => {
  let service: TagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MOCK_BOOKMARK_MODEL,
        MOCK_TAG_MODEL,
        TagService,
        BookmarkService,
      ],
    }).compile();

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

    await service.addTag(MOCK_BOOKMARK_INPUT);
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

  // it('Should able to return updatedBookmarkDTO when call setArchiveTag', async () => {
  //   const MOCK_TAG_SET_ARCHIVE_INPUT = {
  //     bookmarkId: Types.ObjectId().toHexString(),
  //   } as TagSetArchiveInputDTO;
  //   await service.setArchiveTag(MOCK_TAG_SET_ARCHIVE_INPUT);
  // });
});
