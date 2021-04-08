import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginResponseDTO } from 'src/account/dtos/user.login.response.dto';
import { UserResponseDTO } from 'src/account/dtos/user.response.dto';
import { AccountResolver as AccountService } from '../account/account.resolver';
import { UserLoginInputDTO } from '../account/dtos/user.login.input.dto';
import { UserRegisterInputDTO } from '../account/dtos/user.register.input.dto';
import { UserBadRequestException } from '../account/exceptions/user.bad-request.exception';
import { UserInvalidCredentialException } from '../account/exceptions/user.invalid-credentials.exception';
import { PasswordUtils } from '../account/utils/password.utils';
@Injectable()
export class AuthenticationService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}
  public async register(
    registrationData: UserRegisterInputDTO,
  ): Promise<UserResponseDTO> {
    const hashedPassword = await PasswordUtils.hash(registrationData.password);
    try {
      const createdUser = await this.accountService.createAccount({
        ...registrationData,
        password: hashedPassword,
      });
      //   createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      throw new UserBadRequestException();
    }
  }

  public async getAuthenticatedUser(
    authenData: UserLoginInputDTO,
  ): Promise<UserLoginResponseDTO> {
    try {
      const user = await this.accountService.getByEmail(authenData);
      const hashedPassword = await PasswordUtils.hash(authenData.password);
      await this.verifyPassword(user.password, hashedPassword);
      //   user.password = undefined;
      return user;
    } catch (error) {
      throw new UserInvalidCredentialException();
    }
  }
  private async verifyPassword(plainText: string, hashedPassword: string) {
    const isPasswordMatching = await PasswordUtils.compare(
      plainText,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new UserInvalidCredentialException();
    }
  }

  public async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return { access_token: this.jwtService.sign(payload) };
  }
}
