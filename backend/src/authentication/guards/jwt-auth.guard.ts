import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT_CONSTANTS } from '../constants';
import { UserLoginResponseDTO } from '../dtos/user.login.response.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req as Request;
    const token = req.cookies.Authorization || req.headers.Authorization;

    if (!token) return false;

    const extractToken = token.replace('Bearer ', '');
    const { username } = this.jwtService.verify(extractToken, {
      secret: JWT_CONSTANTS.secret,
    }) as Pick<UserLoginResponseDTO, 'username'>;
    const valid = !!username;
    return valid;
  }
}
