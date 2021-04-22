import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountModule } from '../account/account.module';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';
import { JWT_CONSTANTS } from './constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const JwtProvider = JwtModule.register({
  secret: JWT_CONSTANTS.secret,
  signOptions: { expiresIn: '3600s' },
});
@Module({
  imports: [forwardRef(() => AccountModule), PassportModule, JwtProvider],
  providers: [AuthenticationService, AuthenticationResolver, JwtAuthGuard],
  exports: [AuthenticationService, JwtAuthGuard, JwtProvider],
})
export class AuthenticationModule {}
