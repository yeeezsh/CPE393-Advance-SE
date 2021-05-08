import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { ConfigAppService } from './config/config.app.service';
import { ConfigDatabaseService } from './config/config.database.service';
import { ConfigModule } from './config/config.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ConfigDatabaseService,
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigAppService],
      useFactory: (config: ConfigAppService) => ({
        useGlobalPrefix: true,
        autoSchemaFile: join(process.cwd(), 'schema.gql'),
        sortSchema: true,
        cors: { origin: config.get().origin, credentials: true },
        context: ({ req }) => ({ ...req }),
      }),
    }),
    AccountModule,
    AuthenticationModule,
    BookmarkModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
