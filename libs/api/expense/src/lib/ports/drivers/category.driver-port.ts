import { Category } from '@gt-technical-test/libs/common';

export interface CategoryDriverPort {
  getCategories(): Promise<Category[]>;
}
