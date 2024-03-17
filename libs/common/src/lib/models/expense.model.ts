import { SelectItem } from './select-item.model';

export type Expense = {
  id: number;
  name: string;
  amount: number;
  date: Date;
  category: SelectItem;
};
