import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { UserRegisterInputDTO } from 'src/account/dtos/user.register.input.dto';
import { UserBadRequestException } from 'src/account/exceptions/user.bad-request.exception';
import { UserInvalidCredentialException } from 'src/account/exceptions/user.invalid-credentials.exception';
import { PasswordUtils } from 'src/account/utils/password.utils';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly accountService: AccountService,
    private jwtService: JwtService,
  ) {}
  public async register(registrationData: UserRegisterInputDTO) {
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

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.accountService.getByEmail(email);
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
