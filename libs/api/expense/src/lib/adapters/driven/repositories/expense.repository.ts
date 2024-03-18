import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { Expense } from '@gt-technical-test/libs/common';

@Injectable()
export class ExpenseRepository extends Repository<Expense> {
  constructor(private readonly dataSource: DataSource) {
    super(Expense, dataSource.createEntityManager());
  }
}
