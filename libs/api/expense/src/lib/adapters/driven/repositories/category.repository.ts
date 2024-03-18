import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { Category } from '@gt-technical-test/libs/common';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }
}
