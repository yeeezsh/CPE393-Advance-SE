import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { ConfigDatabaseService } from './config/config.database.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({ useClass: ConfigDatabaseService }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
