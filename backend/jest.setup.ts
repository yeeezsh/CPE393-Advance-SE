import { ConfigEnvType } from './src/config/@types/config.env.type';
import { MOCK_ENV } from './test/mock.env.constant';

beforeAll(() => {
  process.env = {
    ...MOCK_ENV,
  } as ConfigEnvType;
});
