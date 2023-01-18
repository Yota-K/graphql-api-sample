import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ORM_CONFIG } from './config/ormconfig';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    // TypeORMの設定
    TypeOrmModule.forRoot(ORM_CONFIG),
    // GraphQL・Apolloの設定
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // バックエンドの実装を元にGraphQLスキーマを生成する
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // GraphQL playgroundを有効にする
      playground: true,
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
