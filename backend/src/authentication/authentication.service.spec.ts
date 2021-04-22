import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountModule } from '../account/account.module';
import { AccountResolver } from '../account/account.resolver';
import { UserLoginInputDTO } from '../account/dtos/user.login.input.dto';
import { UserLoginResponseDTO } from '../account/dtos/user.login.response.dto';
import {
  MOCK_USER_MODEL
} from '../account/tests/mock.user.model';
import { AuthenticationService } from './authentication.service';
import { jwtConstants } from './constants';

const MOCK_LOGIN_INPUT = {
  email: 'a@b.c',
  password: '1234',
} as UserLoginInputDTO;

const MOCK_LOGIN_RESPONSE = {
  _id: '1',
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
        AccountModule,
        PassportModule,

        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthenticationService, AccountResolver, MOCK_USER_MODEL],
    }).compile();

    service = moduleRef.get<AuthenticationService>(AuthenticationService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Shoue return a user object when credential are valid', async () => {
    const res = await service.getAuthenticatedUser(MOCK_LOGIN_INPUT);
    expect(res).toEqual(MOCK_LOGIN_RESPONSE);
  });
});
