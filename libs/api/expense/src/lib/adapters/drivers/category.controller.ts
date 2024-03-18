import { Controller, Get, Inject } from '@nestjs/common';

import { Category } from '@gt-technical-test/libs/common';

import { CategoryService } from '../../domain';
import { CategoryDriverPort } from '../../ports';

@Controller('categories')
export class CategoryController {
  constructor(
    @Inject(CategoryService)
    private readonly expenseDriverPort: CategoryDriverPort
  ) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.expenseDriverPort.getCategories();
  }
}
