import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { PassportModule } from '@nestjs/passport';
import {AuthenticationService} from './authentication.service';
import { LocalStrategy } from './local.strategy';
@Module({
  imports: [AccountModule, PassportModule],
  providers: [AuthenticationService, LocalStrategy],
  // controller: [AuthenticationController]
})
export class AuthenticationModule {}
