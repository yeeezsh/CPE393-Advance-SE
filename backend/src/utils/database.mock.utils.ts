import { Logger } from '@nestjs/common';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { ConfigAppServiceType } from '../config/@types/config-app.service.type';

export const replSet = new MongoMemoryReplSet({
  replSet: { storageEngine: 'wiredTiger' },
});

export const databaseMockUtils = async (): Promise<
  ConfigAppServiceType['database']
> => {
  await replSet.waitUntilRunning();
  const uri = await replSet.getUri();
  const onJest = process.env.JEST_WORKER_ID !== undefined;
  Logger.log(`Running on Jest: ${onJest}`);
  Logger.log(`Mock replica URI: ${uri}`);
  return {
    connection_string: uri,
    username: '',
    password: '',
    auth_source: 'admin',
  };
};
