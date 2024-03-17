import { Category } from './category.model';

export type Expense = {
  id: number;
  name: string;
  amount: number;
  date: Date;
  category: Category;
};
