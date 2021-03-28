import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { ConfigEnvType } from '../src/config/@types/config.env.type';
import { databaseMockUtils } from '../src/utils/database.mock.utils';
import { MOCK_ENV } from './mock.env.constant';

// 60s timeout
jest.setTimeout(60000);

const replSet = new MongoMemoryReplSet({
  replSet: { storageEngine: 'wiredTiger' },
});

beforeAll(async () => {
  const db = await databaseMockUtils(replSet);
  process.env = {
    ...MOCK_ENV,
    DATABASE_CONNECTION: db.connection_string,
    DATABASE_USERNAME: db.username,
    DATABASE_PASSWORD: db.password,
    DATABASE_AUTH_SOURCE: db.auth_source,
  } as ConfigEnvType;
});

afterAll(async () => {
  await replSet.stop();
});
