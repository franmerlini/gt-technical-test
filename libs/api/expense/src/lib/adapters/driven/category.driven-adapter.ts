import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryEntity } from '@gt-technical-test/libs/api/database';

import { CategoryDrivenPort } from '../../ports';
import { CategoryRepository } from './repositories';

@Injectable()
export class CategoryDrivenAdapter implements CategoryDrivenPort {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: CategoryRepository
  ) {}

  getCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }
}
