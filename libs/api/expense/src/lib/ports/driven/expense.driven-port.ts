import { DeleteResult, UpdateResult } from 'typeorm';

import {
  CreateExpenseDto,
  Expense,
  UpdateExpenseDto,
} from '@gt-technical-test/libs/common';

export interface ExpenseDrivenPort {
  createExpense(expense: CreateExpenseDto): Promise<Expense>;
  updateExpense(id: number, expense: UpdateExpenseDto): Promise<UpdateResult>;
  deleteExpense(id: number): Promise<DeleteResult>;
  getExpense(id: number): Promise<Expense | null>;
  getExpenses(): Promise<Expense[]>;
}
