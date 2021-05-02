import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schema/tag.schema';
import { Bookmark, UrlSchema } from './schema/bookmark.schema';
import { TagService } from './tag.service';
import { TagsResolver } from './tags.resolve';
import { UrlsResolver } from './bookmark.resolver';
import { UrlsService } from './bookmark.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bookmark.name,
        schema: UrlSchema,
      },
      { name: Tag.name, schema: TagSchema },
    ]),
  ],
  providers: [UrlsService, TagService, UrlsResolver, TagsResolver],
})
export class UrlsModule {}
