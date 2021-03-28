import { Inject, Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigProvider } from './config.provider';

@Injectable()
export class ConfigDatabaseService implements MongooseOptionsFactory {
  constructor(
    @Inject(ConfigProvider) private readonly configService: ConfigProvider,
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
    };
  }
}
