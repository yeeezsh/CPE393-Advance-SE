import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigProviderValue } from './config/@types/config.type';
import { ConfigModule } from './config/config.module';
import { ConfigProvider } from './config/config.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port }: ConfigProviderValue = app
    .select(ConfigModule)
    .get(ConfigProvider)
    .get();

  await app.listen(port);
}
bootstrap();
