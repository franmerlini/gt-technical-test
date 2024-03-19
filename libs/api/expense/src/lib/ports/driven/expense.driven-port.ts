import { DeleteResult, UpdateResult } from 'typeorm';

import { ExpenseEntity } from '@gt-technical-test/libs/api/database';
import { CreateExpenseDto, UpdateExpenseDto } from '@gt-technical-test/libs/common';

export interface ExpenseDrivenPort {
  createExpense(expense: CreateExpenseDto): Promise<ExpenseEntity>;
  updateExpense(id: number, expense: UpdateExpenseDto): Promise<UpdateResult>;
  deleteExpense(id: number): Promise<DeleteResult>;
  getExpense(id: number): Promise<ExpenseEntity | null>;
  getExpenses(): Promise<ExpenseEntity[]>;
}
