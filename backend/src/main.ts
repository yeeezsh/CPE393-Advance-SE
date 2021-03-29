import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigAppServiceType } from './config/@types/config-app.service.type';
import { ConfigAppService } from './config/config.app.service';
import { ConfigModule } from './config/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { port }: ConfigAppServiceType = app
    .select(ConfigModule)
    .get(ConfigAppService)
    .get();

  await app.listen(port);
}
bootstrap();
