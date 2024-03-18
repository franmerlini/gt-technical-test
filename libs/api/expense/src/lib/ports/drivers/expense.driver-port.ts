import {
  CreateExpenseDto,
  Expense,
  UpdateExpenseDto,
} from '@gt-technical-test/libs/common';

export interface ExpenseDriverPort {
  createExpense(expense: CreateExpenseDto): Promise<Expense>;
  updateExpense(id: number, expense: UpdateExpenseDto): Promise<Expense>;
  deleteExpense(id: number): Promise<number>;
  getExpense(id: number): Promise<Expense>;
  getExpenses(): Promise<Expense[]>;
}
