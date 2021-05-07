import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { print } from 'graphql';
import gql from 'graphql-tag';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { SystemTagType } from '../src/bookmark/@types/systemTag-type.type';

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

const createTagInput = gql`
  mutation {
    createTag(TagCreateInputDTO: { owner: "12", label: "whatever" }) {
      _id
      owner
      label
    }
  }
`;

describe('', () => {
  let app: INestApplication;

  let bookmarkId: string;
  let tagId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(bookmarkInput) })
      .then((res) => {
        const data = res.body.data;
        bookmarkId = data.addBookmark._id;
      });
  });

  it('should able to create tag', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(createTagInput) })
      .expect((res) => {
        const data = res.body.data;
        expect(data.createTag.label).toBe('whatever');
        tagId = data.createTag._id;
      });
  });

  it('should able to addTagToBookmark', () => {
    const addTagToBookmarkInput = gql`
      mutation {
        addTagToBookmark(TagAddToBookmarkDTO: {
            bookmarkId: ${`"${bookmarkId}"`}
            _id: ${`"${tagId}"`}
        }){
            _id
            tags
            original
            owner
        }
      }
    `;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: print(addTagToBookmarkInput),
      })
      .expect((res) => {
        const data = res.body.data;
        expect(data.addTagToBookmark.tags).toStrictEqual([tagId]);
      });
  });

  it('should able to setArchive tag to bookmark', () => {
    const setArchiveTagInput = gql`
        mutation{
            setArchiveTag(
                BookmarkGetInputDTO:{
                    bookmarkId: ${`"${bookmarkId}"`}
                }
                ){
                    _id
                    tags
                    original
                    owner
                }
        }
`;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(setArchiveTagInput) })
      .expect((res) => {
        const data = res.body.data;
        expect(data.setArchiveTag.tags).toStrictEqual([
          tagId,
          SystemTagType.archive,
        ]);
      });
  });

  it('Should able to set delete tag to bookmark', () => {
    const deleteTagInput = gql`
    mutation{
        deleteTag(
            BookmarkGetInputDTO:{
                bookmarkId: ${`"${bookmarkId}"`}
            }
            ){
                _id
                tags
                original
                owner
            }
    }
`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(deleteTagInput) })
      .expect((res) => {
        const data = res.body.data;
        expect(data.deleteTag.tags).toStrictEqual([
          tagId,
          SystemTagType.archive,
          SystemTagType.delete,
        ]);
      });
  });

  it('should able to edit tag', () => {
    const editTagInput = gql`
      mutation {
        editTag(TagEditInputDTO: {
            _id: ${`"${tagId}"`}
            label: "Changed label"
            }) {
                _id
                owner
                label
                
            }
      }
    `;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(editTagInput) })
      .expect((res) => {
        const data = res.body.data;
        expect(data.editTag.label).toBe('Changed label');
      });
  });

  it('should able to listAllTag', async () => {
    const listAllTagInput = gql`
      query {
        listAllTag(owner: "12") {
          result {
            _id
            label
          }
        }
      }
    `;

    const createSecondTagInput = gql`
      mutation {
        createTag(TagCreateInputDTO: { owner: "12", label: "omg" }) {
          _id
          owner
          label
        }
      }
    `;

    await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(createSecondTagInput) });

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: print(listAllTagInput) })
      .expect((res) => {
        const data = res.body.data;
        expect(data.listAllTag.result).toHaveLength(2);
        expect(data.listAllTag.result[1].label).toBe('omg');
      });
  });
});
