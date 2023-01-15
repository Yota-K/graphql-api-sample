import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // GraphQL・Apolloの設定
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // バックエンドの実装を元にGraphQLスキーマを生成する
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // GraphQL playgroundを有効にする
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
