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
        note: "test note"
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
      _id
      original
      domain
    }
  }
`;

describe('', () => {
  let app: INestApplication;
  let id: string;

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
        expect(data.addBookmark.domain).toBe('docs.google.com');
      });
  });

  it('should return 1 bookmark that already create from previous test', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(bookmarkQueryByUser) })
      .expect((res) => {
        const data = res.body.data;
        expect(data.getRecentBookmark[0].domain).toBe('docs.google.com');
        id = data.getRecentBookmark[0]._id;
      });
  });

  it('should able to edit bookmark via _id from previous test', () => {
    const editBookmarkById = gql`
      mutation {
        editBookmark(
          BookmarkEditInputDTO: {
            _id: ${`"${id}"`}
            original: "http://google.com"
            tags: []
          }
        ) {
          _id
          note
          domain
        }
      }
    `;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(editBookmarkById),
      })
      .expect((res) => {
        const data = res.body.data;
        expect(data.editBookmark.domain).toBe('google.com');
        // partial update should be supported
        expect(data.editBookmark.note).toBe('test note');
      });
  });

  it('should able to get one bookmark when getABookmark is called', () => {
    const getABookmarkInput = gql`
     query {
        getABookmark(bookmarkId: ${`"${id}"`}
        ){
          _id
          owner
          domain
            original
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(getABookmarkInput) })
      .expect((res) => {
        const data = res.body.data;
        console.log(data);
        expect(data.getABookmark._id).toBe(id);
      });
  });
});
