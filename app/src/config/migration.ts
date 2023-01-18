import { DataSource } from 'typeorm';
import { ORM_CONFIG } from './ormconfig';

// migrationに使用する処理
export const AppDataSource = new DataSource(ORM_CONFIG);
