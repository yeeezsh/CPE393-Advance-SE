import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthenticationModule),
  ],
  providers: [AccountService, AccountResolver],
  exports: [AccountService, AccountResolver],
})
export class AccountModule {}
