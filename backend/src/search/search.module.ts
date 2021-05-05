import { Module } from '@nestjs/common';
import { BookmarkModule } from '../bookmark/bookmark.module';
import { SearchService } from './search.service';

@Module({
  imports: [BookmarkModule],
  providers: [SearchService],
})
export class SearchModule {}
