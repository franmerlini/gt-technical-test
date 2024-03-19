import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { ExpenseEntity } from '@gt-technical-test/libs/api/database';

@Injectable()
export class ExpenseRepository extends Repository<ExpenseEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ExpenseEntity, dataSource.createEntityManager());
  }
}
