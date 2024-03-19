import { CategoryEntity } from '@gt-technical-test/libs/api/database';

export interface CategoryDriverPort {
  getCategories(): Promise<CategoryEntity[]>;
}
