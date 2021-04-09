import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { AccountService } from './account.service';
import {
  MOCK_USER_DOCUMENT,
  MOCK_USER_MODEL,
  MOCK_USER_VALUE,
} from './tests/mock.user.model';

describe('AccountService', () => {
  let provider: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MOCK_USER_MODEL, AccountService],
    }).compile();

    provider = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should able to create and return user data', async () => {
    const createAccount = await provider.createAccount(MOCK_USER_DOCUMENT);
    expect(createAccount).toEqual(MOCK_USER_DOCUMENT);
  });

  it('should able to deactivate and throw if user not exisiting', async () => {
    const deactivate = await provider.deactivateAccount(MOCK_USER_DOCUMENT._id);
    expect(deactivate).toEqual(MOCK_USER_DOCUMENT);

    jest.spyOn(MOCK_USER_VALUE, 'findOneAndUpdate').mockImplementation(() => {
      throw new Error('user not exisiting');
    });
    const notExisitingObjectId = Types.ObjectId();
    expect(
      provider.deactivateAccount(notExisitingObjectId),
    ).rejects.toThrowError();
  });
});
