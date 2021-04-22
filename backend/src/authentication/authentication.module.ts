import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountModule } from '../account/account.module';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';
import { JWT_CONSTANTS } from './constants';
@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_CONSTANTS.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthenticationService, AuthenticationResolver],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
