import { ExpenseEntity } from '@gt-technical-test/libs/api/database';
import { CreateExpenseDto, UpdateExpenseDto } from '@gt-technical-test/libs/common';

export interface ExpenseDriverPort {
  createExpense(expense: CreateExpenseDto): Promise<ExpenseEntity>;
  updateExpense(id: number, expense: UpdateExpenseDto): Promise<ExpenseEntity>;
  deleteExpense(id: number): Promise<number>;
  getExpense(id: number): Promise<ExpenseEntity>;
  getExpenses(): Promise<ExpenseEntity[]>;
}
