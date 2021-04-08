import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './authhentication/local-auth.guard';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return req.user;
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
