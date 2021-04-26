import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigAppServiceType } from './config/@types/config-app.service.type';
import { ConfigAppService } from './config/config.app.service';
import { ConfigModule } from './config/config.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const { port }: ConfigAppServiceType = app
    .select(ConfigModule)
    .get(ConfigAppService)
    .get();

  app.use(cookieParser());

  await app.listen(port);
}
bootstrap();
