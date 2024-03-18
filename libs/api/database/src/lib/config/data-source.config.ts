import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { join } from 'path';

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
  entities: [
    join(__dirname, '../../../../../common/src/lib/models/*.model{.ts,.js}'),
  ],
  // entities: [Expense, Category],
  migrations: [join(__dirname, '../../../migrations/*{.ts,.js}')],
  synchronize: true,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const dataSource = new DataSource(dataSourceOptions);
