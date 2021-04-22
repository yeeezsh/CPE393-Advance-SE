import { forwardRef, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { ConfigDatabaseService } from './config/config.database.service';
import { ConfigModule } from './config/config.module';
import { AccountModule } from './account/account.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ConfigDatabaseService,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      cors: { origin: true, credentials: true },
      context: ({ req }) => ({ ...req }),
    }),
    AccountModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
