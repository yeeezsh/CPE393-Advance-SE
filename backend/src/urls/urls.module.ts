import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schema/tag.schema';
import { Url, UrlSchema } from './schema/url.schema';
import { UrlsResolver } from './urls.resolver';
import { UrlsService } from './urls.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Url.name,
        schema: UrlSchema,
      },
      { name: Tag.name, schema: TagSchema },
    ]),
  ],
  providers: [UrlsService, UrlsResolver],
  exports: [UrlsService, UrlsResolver],
})
export class UrlsModule {}