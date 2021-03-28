import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { User, UserDocument } from './schema/user.schema';

const MOCK_USER_DOCUMENT = {
  displayName: 'ds',
  username: '',
  email: 'a@b.c',
} as Omit<UserDocument, 'password'>;

describe('AccountService', () => {
  let provider: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest
              .fn()
              .mockImplementation(() => Promise.resolve(MOCK_USER_DOCUMENT)),
          },
        },
        AccountService,
      ],
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
});
