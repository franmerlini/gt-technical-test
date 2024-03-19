import { Controller, Get, Inject } from '@nestjs/common';

import { CategoryEntity } from '@gt-technical-test/libs/api/database';

import { CategoryService } from '../../domain';
import { CategoryDriverPort } from '../../ports';

@Controller('categories')
export class CategoryController {
  constructor(
    @Inject(CategoryService)
    private readonly expenseDriverPort: CategoryDriverPort
  ) {}

  @Get()
  getCategories(): Promise<CategoryEntity[]> {
    return this.expenseDriverPort.getCategories();
  }
}
