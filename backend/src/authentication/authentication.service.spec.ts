import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../account/account.service';
import { MOCK_USER_DOCUMENT } from '../account/tests/mock.user.model';
import { PasswordUtils } from '../account/utils/password.utils';
import { AuthenticationService } from './authentication.service';
import { JWT_CONSTANTS } from './constants';
import { UserLoginInputDTO } from './dtos/user.login.input.dto';
import { UserLoginResponseDTO } from './dtos/user.login.response.dto';

const MOCK_ACCOUNT_SERVICE = {
  getByEmail: () => MOCK_USER_DOCUMENT,
};

const MOCK_LOGIN_INPUT = {
  email: 'a@b.c',
  password: '1234',
} as UserLoginInputDTO;

const MOCK_LOGIN_RESPONSE = {
  _id: MOCK_USER_DOCUMENT._id,
  displayName: 'ds',
  username: '',
  email: 'a@b.c',
  password: '1234',
} as UserLoginResponseDTO;
describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: JWT_CONSTANTS.secret,
          signOptions: { expiresIn: '3600s' },
        }),
      ],
      providers: [AuthenticationService, AccountService],
    })
      .overrideProvider(AccountService)
      .useValue(MOCK_ACCOUNT_SERVICE)
      .compile();

    service = moduleRef.get<AuthenticationService>(AuthenticationService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return a user object when credential are valid', async () => {
    jest.spyOn(PasswordUtils, 'compare').mockImplementation(async () => true);
    const res = await service.login(MOCK_LOGIN_INPUT);
    expect(res.username).toEqual(MOCK_LOGIN_RESPONSE.username);
  });

  it('Should throw error a user object when credential are invalid', async () => {
    jest.spyOn(PasswordUtils, 'compare').mockImplementation(async () => false);
    expect(service.login(MOCK_LOGIN_INPUT)).rejects.toThrowError();
  });
});
