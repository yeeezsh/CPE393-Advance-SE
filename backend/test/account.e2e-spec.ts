import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import gql from 'graphql-tag';
import { print } from 'graphql';

describe('Account (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should able to create account', async () => {
    const userInput = gql`
      mutation {
        createAccount(
          UserRegisterInputDTO: {
            username: "test1"
            password: "1234567"
            displayName: "test dsp name"
            email: "yee@y.com"
          }
        ) {
          username
          displayName
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(userInput) })
      .expect((res) => {
        const data = res.body.data;
        expect(data.createAccount.username).toEqual('test1');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
