import { DataSourceOptions } from 'typeorm';

export const ORM_CONFIG: DataSourceOptions = {
  type: 'mysql',
  // DBの接続情報
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  // マイグレーション関連の設定
  entities: [process.cwd() + '/dist/**/entities/**/*.entity.js'],
  migrations: [process.cwd() + '/dist/database/migrations/**/*.js'],
};
