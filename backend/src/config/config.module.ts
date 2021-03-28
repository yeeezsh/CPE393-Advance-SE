import { Module } from '@nestjs/common';
import { ConfigDatabaseService } from './config.database.service';
import { ConfigProvider } from './config.provider';

@Module({
  providers: [ConfigProvider, ConfigDatabaseService],
  exports: [ConfigProvider, ConfigDatabaseService],
})
export class ConfigModule {}
