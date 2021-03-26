import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG_PROVIDER } from './config/@types/config.constant';
import { ConfigProviderValue } from './config/@types/config.type';
import { ConfigModule } from './config/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port }: ConfigProviderValue = app
    .select(ConfigModule)
    .get(CONFIG_PROVIDER);

  await app.listen(port);
}
bootstrap();
