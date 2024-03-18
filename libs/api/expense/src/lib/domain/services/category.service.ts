import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '@gt-technical-test/libs/common';

import { CategoryDrivenAdapter } from '../../adapters';
import { CategoryDrivenPort, CategoryDriverPort } from '../../ports';

@Injectable()
export class CategoryService implements CategoryDriverPort {
  constructor(
    @Inject(CategoryDrivenAdapter)
    private readonly categoryDrivenPort: CategoryDrivenPort
  ) {}

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryDrivenPort.getCategories();

    if (categories.length === 0) {
      throw new NotFoundException(`No categories found.`);
    }

    return categories;
  }
}
