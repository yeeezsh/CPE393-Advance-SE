import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import { ConfigAppService } from '../config/config.app.service';
import { ConfigModule } from '../config/config.module';
import { AuthenticationResolver } from './authentication.resolver';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

const JwtProvider = JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigAppService],
  useFactory: (config: ConfigAppService) => ({
    secret: config.get().jwt.secret,
    signOptions: {
      expiresIn: config.get().jwt.expire,
    },
  }),
});
@Module({
  imports: [ConfigModule, forwardRef(() => AccountModule), JwtProvider],
  providers: [AuthenticationService, AuthenticationResolver, JwtAuthGuard],
  exports: [AuthenticationService, JwtAuthGuard, JwtProvider, ConfigModule],
})
export class AuthenticationModule {}
