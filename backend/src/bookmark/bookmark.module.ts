import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schema/tag.schema';
import { Bookmark, UrlSchema } from './schema/bookmark.schema';
import { TagService } from './tag.service';
import { TagsResolver } from './tags.resolve';
import { BookmarkResolver } from './bookmark.resolver';
import { BookmarkService } from './bookmark.service';

const Schema = MongooseModule.forFeature([
  {
    name: Bookmark.name,
    schema: UrlSchema,
  },
  { name: Tag.name, schema: TagSchema },
]);
@Module({
  imports: [Schema],
  providers: [BookmarkService, TagService, BookmarkResolver, TagsResolver],
  exports: [BookmarkService, TagService, Schema],
})
export class BookmarkModule {}
