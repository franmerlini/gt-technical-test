import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { CategoryEntity } from '@gt-technical-test/libs/api/database';

@Injectable()
export class CategoryRepository extends Repository<CategoryEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CategoryEntity, dataSource.createEntityManager());
  }
}
