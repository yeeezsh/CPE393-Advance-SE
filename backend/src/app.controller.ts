import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticationService } from './authentication/authentication.service';
import { JwtAuthGuard } from './authentication/guards/jwt-auth.guard';
import { LocalAuthGuard } from './authentication/guards/local-auth.guard';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthenticationService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('main')
  getMainPage(@Request() req: any) {
    return req.user;
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
