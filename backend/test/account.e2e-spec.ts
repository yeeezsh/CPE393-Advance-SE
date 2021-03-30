import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import gql from 'graphql-tag';
import { print } from 'graphql';

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
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(userInput) })
      .expect((res) => {
        const data = res.body.data;
        expect(data.createAccount.username).toEqual('test1');
      });
  });

  it('should not able to create account becuase it dulpicated', async () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(userInput) })
      .expect(({ body }) => {
        expect(body.data).toBe(null);
        expect(body.errors).not.toBe(null);
      });
  });

  it('should not able to create becuase not meet minimum requirements', async () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(gql`
          mutation {
            createAccount(
              UserRegisterInputDTO: {
                username: "yee"
                password: "1"
                displayName: "dsp name"
                email: "t.com"
              }
            ) {
              username
              displayName
            }
          }
        `),
      })
      .expect(({ body }) => {
        const errors = body.errors;
        expect(body.data).toBe(null);
        expect(errors).not.toBe(null);
        expect(errors[0].message).toBe('Bad Request Exception');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
