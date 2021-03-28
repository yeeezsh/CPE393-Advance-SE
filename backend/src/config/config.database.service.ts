import { Inject, Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigAppService } from './config.app.service';

@Injectable()
export class ConfigDatabaseService implements MongooseOptionsFactory {
  constructor(
    @Inject(ConfigAppService) private readonly configService: ConfigAppService,
  ) {}
  createMongooseOptions(): MongooseModuleOptions {
    const {
      connection_string,
      username,
      password,
      auth_source,
    } = this.configService.get().database;

    return {
      uri: connection_string,
      user: username,
      pass: password,
      authSource: auth_source,
      useUnifiedTopology: true,
    };
  }
}
