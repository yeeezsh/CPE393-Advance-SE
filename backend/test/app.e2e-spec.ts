import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ConfigEnvType } from '../src/config/@types/config.env.type';
import { databaseMockUtils } from '../src/utils/database.mock.utils';
import { AppModule } from './../src/app.module';
import { MOCK_ENV } from './mock.env.constant';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const db = await databaseMockUtils();
    process.env = {
      ...MOCK_ENV,
      DATABASE_CONNECTION: db.connection_string,
      DATABASE_USERNAME: db.username,
      DATABASE_PASSWORD: db.password,
      DATABASE_AUTH_SOURCE: db.auth_source,
    } as ConfigEnvType;
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
