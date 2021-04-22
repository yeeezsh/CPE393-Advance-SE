import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { UserInvalidCredentialException } from '../account/exceptions/user.invalid-credentials.exception';
import { PasswordUtils } from '../account/utils/password.utils';
import { UserLoginInputDTO } from './dtos/user.login.input.dto';
import { UserLoginResponseDTO } from './dtos/user.login.response.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: UserLoginInputDTO): Promise<UserLoginResponseDTO> {
    const user = await this.accountService.getByEmail(loginDto.email);
    if (!user) throw new UserInvalidCredentialException();
    const valid = await PasswordUtils.compare(loginDto.password, user.password);
    if (!valid) throw new UserInvalidCredentialException();
    const token = await this.jwtService.signAsync(user);
    return { ...user, token, _id: user._id };
  }
}
