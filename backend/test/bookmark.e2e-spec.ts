import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import gql from 'graphql-tag';
import { print } from 'graphql';

const bookmarkInput = gql`
  mutation {
    addBookmark(
      BookmarkCreateInputDTO: {
        original: "http://www.docs.google.com/app"
        note: ""
        owner: "12"
        tags: []
      }
    ) {
      _id
      original
      domain
    }
  }
`;

const bookmarkQueryByUser = gql`
  query {
    getRecentBookmark(userId: "12") {
      original
      domain
    }
  }
`;
describe('', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should able to create bookmark', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(bookmarkInput) })
      .expect((res) => {
        const data = res.body.data;
        expect(data.addBookmark.domain).toBe('docs.google.com/');
      });
  });

  it('should return 1 bookmark that already create from previous test', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(bookmarkQueryByUser) })
      .expect((res) => {
        const data = res.body.data;
        expect(data.addBookmark.domain).toBe('docs.google.com/');
      });
  });
});
