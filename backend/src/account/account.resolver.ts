import { UseFilters } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { UserDTO } from './dtos/user.dto';
import { UserLoginInputDTO } from './dtos/user.login.input.dto';
import { UserLoginResponseDTO } from './dtos/user.login.response.dto';
import { UserRegisterInputDTO } from './dtos/user.register.input.dto';
import { UserResponseDTO } from './dtos/user.response.dto';
import { UserMongoErrorFilterException } from './exceptions/filters/user.mongo-error.filter-exception';

@Resolver(() => UserDTO)
export class AccountResolver {
  constructor(private accountService: AccountService) {}

  @UseFilters(UserMongoErrorFilterException)
  @Mutation(() => UserResponseDTO)
  async createAccount(
    @Args('UserRegisterInputDTO') userRegisterInputDTO: UserRegisterInputDTO,
  ): Promise<UserResponseDTO> {
    const user = await this.accountService.createAccount(userRegisterInputDTO);
    return user as UserResponseDTO;
  }

  async getByEmail(
    @Args('UserLoginInputDTO') userLoginInputDTO: UserLoginInputDTO,
  ): Promise<UserLoginResponseDTO> {
    const user = await this.accountService.getByEmail(userLoginInputDTO.email);
    return user as UserLoginResponseDTO;
  }
}
