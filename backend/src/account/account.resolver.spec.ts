import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';
import { UserRegisterInputDTO } from './dtos/user.register.input.dto';
import { MOCK_USER_MODEL, MOCK_USER_VALUE } from './tests/mock.user.model';

const MOCK_USER_INPUT_FOR_REGISTER = {
  displayName: 'hello',
  username: 'yee',
  password: '123456',
  email: 'y@e.com',
} as UserRegisterInputDTO;

describe('AccountResolver', () => {
  let provider: AccountResolver;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [AccountResolver, AccountService, MOCK_USER_MODEL],
    }).compile();

    provider = module.get<AccountResolver>(AccountResolver);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should call AccountService.createAccount() when call createAccount endpoint', async () => {
    const createService = jest.spyOn(MOCK_USER_VALUE, 'create');
    await provider.createAccount(MOCK_USER_INPUT_FOR_REGISTER);
    expect(createService).toBeCalled();
  });
});
