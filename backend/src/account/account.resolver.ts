import { UseFilters, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { AccountService } from './account.service';
import { UserDTO } from './dtos/user.dto';
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

  @UseGuards(JwtAuthGuard)
  @Query(() => UserResponseDTO)
  async getAccount(@Args('UserGetAccountInputDTO') id: string) {
    const user = await this.accountService.getAccount(id);
    return user as UserResponseDTO;
  }
}
