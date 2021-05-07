import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schema/tag.schema';
import { TagService } from './tag.service';
import { TagsResolver } from './tags.resolver';
import { BookmarkResolver } from './bookmark.resolver';
import { BookmarkService } from './bookmark.service';
import { Bookmark, BookmarkSchema } from './schema/bookmark.schema';

const Schema = MongooseModule.forFeature([
  {
    name: Bookmark.name,
    schema: BookmarkSchema,
  },
  { name: Tag.name, schema: TagSchema },
]);
@Module({
  imports: [Schema],
  providers: [BookmarkService, TagService, BookmarkResolver, TagsResolver],
  exports: [BookmarkService, TagService, Schema],
})
export class BookmarkModule {}
