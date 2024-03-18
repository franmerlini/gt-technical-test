import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Category } from '@gt-technical-test/libs/common';

import { CategoryDrivenPort } from '../../ports';
import { CategoryRepository } from './repositories';

@Injectable()
export class CategoryDrivenAdapter implements CategoryDrivenPort {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: CategoryRepository
  ) {}

  getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
