import { Test } from '@nestjs/testing';
import { ConfigProvider } from './config.provider';

const MOCK_ENV = {
  NODE_ENV: 'development',
  TZ: 'Asia/Bangkok',
  ORIGIN: 'http(|s)://localhost:3000',
  DATABASE_CONNECTION: 'mongodb://cpe393-advance-se-mongos/online-url',
  DATABASE_USERAME: 'root',
  DATABASE_PASSWORD: 'CPE393@OnlineURL.MongoDB',
  DATABASE_AUTH_SOURCE: 'admin',
  PORT: '3000',
};

describe('Config Provider Test', () => {
  let configService: ConfigProvider;

  beforeEach(async () => {
    process.env = MOCK_ENV;
    const moduleRef = await Test.createTestingModule({
      providers: [ConfigProvider],
    }).compile();

    configService = moduleRef.get<ConfigProvider>(ConfigProvider);
  });

  it('config should have all these configurations', () => {
    const keys = Object.keys(configService.get());
    const configValue = configService.get() as any;
    const checks = keys.map((el) => configValue[el] !== undefined);
    const isAllTrue = checks.every((el) => el === true);
    expect(isAllTrue).toBe(true);
  });

  it('config should parse port type correctly ', () => {
    const envPort = process.env['PORT'];
    const { port } = configService.get();

    expect(port).toBe(Number(envPort));
    expect(port).not.toBe(undefined);
  });
});
