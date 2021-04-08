import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';
import { UserLoginResponseDTO } from '../../account/dtos/user.login.response.dto';
import { UserInvalidCredentialException } from '../../account/exceptions/user.invalid-credentials.exception';
import { UserLoginInputDTO } from '../../account/dtos/user.login.input.dto';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({ usernameField: 'email' });
  }
  async validate(authenData: UserLoginInputDTO): Promise<UserLoginResponseDTO> {
    const user = this.authenticationService.getAuthenticatedUser(authenData);
    if (!user) {
      throw new UserInvalidCredentialException();
    }
    return user;
  }
}
