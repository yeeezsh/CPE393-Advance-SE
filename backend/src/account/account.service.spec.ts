import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { AccountService } from './account.service';
import { User, UserDocument } from './schema/user.schema';

const MOCK_USER_DOCUMENT = {
  _id: Types.ObjectId(),
  displayName: 'ds',
  username: '',
  email: 'a@b.c',
  password: '1234',
} as UserDocument;

describe('AccountService', () => {
  let provider: AccountService;
  let mockUserModel: Provider;
  let mockUserUseValue: {
    create: jest.Mock<any, any>;
    findOneAndUpdate: jest.Mock<any, any>;
  };

  beforeAll(() => {
    mockUserUseValue = {
      create: jest
        .fn()
        .mockImplementation(() => Promise.resolve(MOCK_USER_DOCUMENT)),
      findOneAndUpdate: jest
        .fn()
        .mockImplementation(() => Promise.resolve(MOCK_USER_DOCUMENT)),
    };
    mockUserModel = {
      provide: getModelToken(User.name),
      useValue: mockUserUseValue,
    };
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [mockUserModel, AccountService],
    }).compile();

    provider = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should able to create and return user data', async () => {
    const createAccount = await provider.createAccount();
    expect(createAccount).toEqual(MOCK_USER_DOCUMENT);
  });

  it('should able to deactivate and throw if user not exisiting', async () => {
    const deactivate = await provider.deactivateAccount(MOCK_USER_DOCUMENT._id);
    expect(deactivate).toEqual(MOCK_USER_DOCUMENT);

    jest.spyOn(mockUserUseValue, 'findOneAndUpdate').mockImplementation(() => {
      throw new Error('user not exisiting');
    });
    const notExisitingObjectId = Types.ObjectId();
    expect(
      provider.deactivateAccount(notExisitingObjectId),
    ).rejects.toThrowError();
  });
});
