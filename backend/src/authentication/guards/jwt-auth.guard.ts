import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigAppService } from '../../config/config.app.service';
import { UserLoginResponseDTO } from '../dtos/user.login.response.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configAppService: ConfigAppService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req as Request;
    const token = req.cookies.Authorization || req.headers.Authorization;

    if (!token) return false;

    const extractToken = token.replace('Bearer ', '');
    const { username } = this.jwtService.verify(extractToken, {
      secret: this.configAppService.get().jwt.secret,
    }) as Pick<UserLoginResponseDTO, 'username'>;
    const valid = !!username;
    return valid;
  }
}
