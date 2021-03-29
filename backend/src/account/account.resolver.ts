import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { UserDTO } from './dtos/user.dto';
import { UserRegisterInputDTO } from './dtos/user.register.input.dto';

@Resolver(() => UserDTO)
export class AccountResolver {
  constructor(private accountService: AccountService) {}

  @Mutation(() => UserDTO)
  async createAccount(
    @Args('UserRegisterInputDTO') userRegisterInputDTO: UserRegisterInputDTO,
  ): Promise<UserDTO> {
    const user = await this.accountService.createAccount(userRegisterInputDTO);
    return user as UserDTO;
  }
}
