import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { UserInvalidCredentialException } from 'src/account/exceptions/user.invalid-credentials.exception';
import { UserDocument } from 'src/account/schema/user.schema';
import AuthenticationService from './authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string): Promise<UserDocument> {
    const user = this.authenticationService.getAuthenticatedUser(
      email,
      password,
    );
    if (!user) {
      throw new UserInvalidCredentialException();
    }
    return user;
  }
}
