import { DataSource, DataSourceOptions } from 'typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { join } from 'path';

import { CategoryEntity, ExpenseEntity } from '../entities';
import { databaseConfig } from './database.config';

const {
  db: { type, host, port, username, password, database },
} = databaseConfig();

export const dataSourceOptions: DataSourceOptions = {
  type,
  host,
  port,
  username,
  password,
  database,
  // entities: [join(__dirname, '../entities/*.entity.ts')],
  entities: [CategoryEntity, ExpenseEntity],
  migrations: [join(__dirname, '../../../migrations/*.ts')],
  synchronize: true,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const dataSource = new DataSource(dataSourceOptions);
