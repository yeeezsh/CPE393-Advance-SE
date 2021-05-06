import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import gql from 'graphql-tag';
import { print } from 'graphql';

const bookmarkInputGoogle = gql`
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

const bookmarkInputDigital = gql`
  mutation {
    addBookmark(
      BookmarkCreateInputDTO: {
        original: "http://digitalocean.com"
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

const bookmarkInputArchive = gql`
  mutation {
    addBookmark(
      BookmarkCreateInputDTO: {
        original: "http://archive.com"
        note: "test note"
        owner: "12"
        tags: ["archive"]
      }
    ) {
      _id
      original
      domain
    }
  }
`;

const bookmarkSearchInput = gql`
  query {
    allTextSearchBookmark(SearchTextInputDTO: { text: "digi", owner: "12" }) {
      results {
        _id
        domain
      }
    }
  }
`;
const bookmarkFilerInput = gql`
  query {
    searchFilterText(SearchFilterTag: { owner: "12", tags: ["archive"] }) {
      results {
        domain
      }
    }
  }
`;

describe('Search (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // init bookmark data
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(bookmarkInputGoogle),
      })
      .send({
        query: print(bookmarkInputDigital),
      })
      .send({
        query: print(bookmarkInputArchive),
      });
  });

  it('should able to search from free text', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(bookmarkSearchInput),
      })
      .expect((res) => {
        const data = res.body.data;
        expect(data.allTextSearchBookmark.results[0].domain).toBe(
          'digitalocean.com',
        );
      });
  });

  it('should able to filter from tag', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(bookmarkFilerInput),
      })
      .expect((res) => {
        const data = res.body.data;
        expect(data.allTextSearchBookmark.results[0].domain).toBe(
          'archive.com',
        );
      });
  });
});
