import { CategoryEntity } from '@gt-technical-test/libs/api/database';

export interface CategoryDrivenPort {
  getCategories(): Promise<CategoryEntity[]>;
}
