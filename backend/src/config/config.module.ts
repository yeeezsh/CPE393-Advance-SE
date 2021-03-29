import { Module } from '@nestjs/common';
import { ConfigDatabaseService } from './config.database.service';
import { ConfigAppService } from './config.app.service';

@Module({
  providers: [ConfigAppService, ConfigDatabaseService],
  exports: [ConfigAppService, ConfigDatabaseService],
})
export class ConfigModule {}
