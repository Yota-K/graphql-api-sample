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

### envファイルを作成します

```sh
cp .sample.env .env
```

dbの名前や接続情報は好きな値を設定してください。

```
MYSQL_HOST=graphql_api_db
MYSQL_PORT=3306
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_ROOT_PASSWORD=
```

### 以下のコマンドを実行して、Dockerコンテナを立ち上げます

```sh
make setup
```

## マイグレーション

マイグレーションファイルが既にある場合は、Dockerコンテナの外で以下のコマンドを実行してください。


```sh
make migration:run
```

新しいテーブルを作成した場合は、エンティティを追加した後に、Dockerコンテナの外で以下のコマンドを実行するとマイグレーションファイルが実行されます。

**create-booksというマイグレーションファイルを作成**

```sh
make migration-generate name=create-books
```

マイグレーションを取り消したい場合は以下のコマンドを実行します。   

```sh
make migration-revert
```

※ 複数のマイグレーションを取り消したい場合は、複数回このコマンドを実行する必要があります。

## 初期データの投入

以下のコマンドを実行後に、dbのパスワードを入力すると初期データの投入を行うことができます。

- sqlDir: 初期データとして投入したいSQLファイルのディレクトリ（ファイル名も含めて指定）
- name: .envにセットしたDBの名前

```sh
make seeding sqlDir=./sql/book-seed.sql name=sample_db
```
