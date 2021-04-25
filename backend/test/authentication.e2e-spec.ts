import gql from 'graphql-tag';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { print } from 'graphql';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';

const userInput = gql`
  mutation {
    userLogin(UserLoginInputDTO: { email: "yee@y.com", password: "1234567" }) {
      username
      displayName
      email
      _id
    }
  }
`;

const createUser = gql`
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

describe('Authentication (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(createUser) });
  });

  it('should be able to login when input is existing user', async () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(userInput) })
      .expect((res) => {
        const data = res.body.data;
        expect(data.userLogin.username).toEqual('test1');
      });
  });

  it('should not be able to login when input is not exist user', async () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(gql`
          mutation {
            userLogin(
              UserLoginInputDTO: {
                email: "should_fail@mail.com"
                password: "123123123"
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
        expect(errors[0].message).toBe('User not existing');
      });
  });

  it('Should not be able to login when the required field is not filled', async () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(gql`
          mutation {
            userLogin(
              UserLoginInputDTO: { email: "should_fail@mail.com", password: "" }
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
