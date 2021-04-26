import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthenticationService } from './authentication.service';
import { UserLoginInputDTO } from './dtos/user.login.input.dto';
import { UserLoginResponseDTO } from './dtos/user.login.response.dto';

@Resolver(() => UserLoginResponseDTO)
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => UserLoginResponseDTO)
  async userLogin(
    @Args('UserLoginInputDTO') userLoginInputDTO: UserLoginInputDTO,
    @Context('req') req: Request,
  ): Promise<UserLoginResponseDTO> {
    const user = await this.authenticationService.login(userLoginInputDTO);
    req.res?.cookie('Authorization', `Bearer ${user.token}`, {
      httpOnly: true,
    });
    return { ...user, token: undefined };
  }
}
