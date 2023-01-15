# graphql-api-sample

Docker環境で動作するGraphQL APIのサンプルです。

## 使用技術

- GraphQL
- TypeScript
- Node.js
- NestJS
- TypeORM
- MySQL

## 環境構築

**前提条件**
この環境を立ち上げるためにはDockerとmakeコマンドが必須です。

### ```cp .sample.env .env```を実行して、envファイルをコピーします

dbの名前や接続情報は好きな値を設定してください。

```
MYSQL_HOST=graphql_api_db
MYSQL_PORT=3306
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_ROOT_PASSWORD=
```

### makeコマンドを実行して、Dockerイメージのビルドと、Dockerコンテナ内で```yarn install```を実行します

```sh
make setup
```

### Dockerコンテナを立ち上げます

```sh
docker-compose up -d
```

## マイグレーション

マイグレーションを実行する際は、Entity（データベースのテーブルをマッピングするクラス）の定義を行った上で、Dockerコンテナで以下のコマンドを実行してください。

```
npx ts-node ./node_modules/.bin/typeorm migration:generate src/database/migrations/{migrationファイルの名前} -d src/config/ormMigration.ts
```

マイグレーションファイル作成後に以下のコマンドをDockerコンテナ内（graphql_api_app）で実行すると、テーブルに変更が反映されます。

```
yarn db:migration
```

## 参考記事
- https://docs.nestjs.com/graphql/quick-start
- https://qiita.com/shinobu_shiva/items/d1df4682a124f45ef046
