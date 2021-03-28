import { Logger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ConfigAppService } from './config.app.service';

const MOCK_ENV = {
  NODE_ENV: 'development',
  TZ: 'Asia/Bangkok',
  ORIGIN: 'http(|s)://localhost:3000',
  DATABASE_CONNECTION: 'mongodb://cpe393-advance-se-mongos/online-url',
  DATABASE_USERNAME: 'root',
  DATABASE_PASSWORD: 'CPE393@OnlineURL.MongoDB',
  DATABASE_AUTH_SOURCE: 'admin',
  PORT: '3000',
};
const BAD_MOCK_ENV = {
  NODE_ENV: 'development',
  ORIGIN: 'http(|s)://localhost:3000',
  DATABASE_CONNECTION: 'mongodb://cpe393-advance-se-mongos/online-url',
  DATABASE_USERNAME: undefined,
  DATABASE_PASSWORD: '',
  DATABASE_AUTH_SOURCE: 'admin',
  PORT: 'haha',
};

describe('Config Provider Test', () => {
  let configService: ConfigAppService;

  beforeAll(() => (process.env = MOCK_ENV));

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ConfigAppService],
    }).compile();

    configService = moduleRef.get<ConfigAppService>(ConfigAppService);
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

  it('config should warning if env not parse correct', () => {
    Logger.error = jest.fn();
    Logger.warn = jest.fn();
    process.env = BAD_MOCK_ENV;
    configService.get();
    expect(Logger.error).toBeCalledTimes(2);
    expect(Logger.warn).toBeCalledTimes(1);
  });
});
