import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ConfigAppServiceType } from './config/@types/config-app.service.type';
import { ConfigAppService } from './config/config.app.service';
import { ConfigModule } from './config/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port, origin }: ConfigAppServiceType = app
    .select(ConfigModule)
    .get(ConfigAppService)
    .get();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: [origin],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(port);
}
bootstrap();
