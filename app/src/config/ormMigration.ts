import { DataSource } from 'typeorm';
import { ORM_CONFIG } from './ormConfig';

// migrationに使用する処理
export const AppDataSource = new DataSource(ORM_CONFIG);
