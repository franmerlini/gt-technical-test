import { Expense } from '../models';

export type CreateExpenseDto = Omit<Expense, 'id'>;
