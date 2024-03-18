import { Category } from '@gt-technical-test/libs/common';

export interface CategoryDrivenPort {
  getCategories(): Promise<Category[]>;
}
