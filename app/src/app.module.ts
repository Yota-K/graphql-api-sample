import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';
import { BooksModule } from './books/books.module';
import { ORM_CONFIG } from './config/ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // TypeORMの設定
    TypeOrmModule.forRoot(ORM_CONFIG),
    // GraphQL・Apolloの設定
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // GraphQLのSubscriptionをNestJSで使用できるようにする
      // MEMO: GraphQL playgroundでsubscriptionの動作チェックをするには、graphql-wsとsubscriptions-transport-wsどっちも入れないと動作しなかった
      // 公式はgraphql-ws使うように推奨してる
      //
      // - https://docs.nestjs.com/graphql/subscriptions
      // - https://stackoverflow.com/questions/69178586/nestjs-graphql-subscriptions-not-working-with-graphql-ws
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      // バックエンドの実装を元にGraphQLスキーマを生成する
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // GraphQL playgroundを有効にする
      playground: true,
    }),
    BooksModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
