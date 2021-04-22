import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountModule } from '../account/account.module';
import { AccountResolver } from '../account/account.resolver';
import { AuthenticationService } from './authentication.service';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/่jwt.strategy';
@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthenticationService, JwtStrategy, JwtAuthGuard, AccountResolver],
  exports: [AuthenticationService],
  // controller: [AuthenticationController]
})
export class AuthenticationModule {}
