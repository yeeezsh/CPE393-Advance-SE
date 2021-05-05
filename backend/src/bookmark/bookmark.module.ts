import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schema/tag.schema';
import { Bookmark, BookmarkSchema } from './schema/bookmark.schema';
import { TagService } from './tag.service';
import { TagsResolver } from './tags.resolve';
import { BookmarkResolver } from './bookmark.resolver';
import { BookmarkService } from './bookmark.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bookmark.name,
        schema: BookmarkSchema,
      },
      { name: Tag.name, schema: TagSchema },
    ]),
  ],
  providers: [BookmarkService, TagService, BookmarkResolver, TagsResolver],
})
export class BookmarkModule {}
