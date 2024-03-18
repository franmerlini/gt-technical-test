import { DataSource, DataSourceOptions } from 'typeorm';

import { Category, Expense } from '@gt-technical-test/libs/common';

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
  entities: [Expense, Category],
  logging: false,
};

export const dataSource = new DataSource(dataSourceOptions);
