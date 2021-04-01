import { Test, TestingModule } from '@nestjs/testing';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';
import { MOCK_USER_MODEL } from './tests/mock.user.model';

describe('AccountResolver', () => {
  let provider: AccountResolver;

  beforeAll(async () => {
    // const accServiceSpy = jest.spyOn(AccountService, '');
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountResolver, AccountService, MOCK_USER_MODEL],
    }).compile();

    provider = module.get<AccountResolver>(AccountResolver);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
