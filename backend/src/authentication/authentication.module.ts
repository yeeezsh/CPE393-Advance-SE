import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './่jwt.strategy';
@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
  exports: [AuthenticationService, JwtModule],
  // controller: [AuthenticationController]
})
export class AuthenticationModule {}
