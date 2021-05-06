import { Module } from '@nestjs/common';
import { BookmarkModule } from '../bookmark/bookmark.module';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';

@Module({
  imports: [BookmarkModule],
  providers: [SearchService, SearchResolver],
})
export class SearchModule {}
