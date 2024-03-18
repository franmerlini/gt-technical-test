import { Inject, Injectable } from '@nestjs/common';

import {
  CreateExpenseDto,
  Expense,
  UpdateExpenseDto,
} from '@gt-technical-test/libs/common';

import { ExpenseDrivenPort } from '../../ports';
import { ExpenseRepository } from './repositories';

@Injectable()
export class ExpenseDrivenAdapter implements ExpenseDrivenPort {
  constructor(
    @Inject(ExpenseRepository)
    private readonly expenseRepository: ExpenseRepository
  ) {}

  createExpense(expense: CreateExpenseDto): Promise<Expense> {
    return this.expenseRepository.save(expense);
  }

  updateExpense(id: number, expense: UpdateExpenseDto): Promise<Expense> {
    return this.expenseRepository.update(id, expense);
  }

  deleteExpense(id: number): Promise<number> {
    return this.expenseRepository.delete(id);
  }

  getExpense(id: number): Promise<Expense | null> {
    return this.expenseRepository.findOne(id);
  }

  getExpenses(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }
}
