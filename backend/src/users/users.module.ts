import { Module } from '@nestjs/common';
import { UserService } from './users.service';

@Module({
  imports: [],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
