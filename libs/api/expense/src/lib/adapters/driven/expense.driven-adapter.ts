import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, UpdateResult } from 'typeorm';

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
    @InjectRepository(ExpenseRepository)
    private readonly expenseRepository: ExpenseRepository
  ) {}

  createExpense(expense: CreateExpenseDto): Promise<Expense> {
    return this.expenseRepository.save(expense);
  }

  updateExpense(id: number, expense: UpdateExpenseDto): Promise<UpdateResult> {
    return this.expenseRepository.update(id, expense);
  }

  deleteExpense(id: number): Promise<DeleteResult> {
    return this.expenseRepository.delete(id);
  }

  getExpense(id: number): Promise<Expense | null> {
    return this.expenseRepository.findOne({
      where: {
        id,
      },
    });
  }

  getExpenses(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }
}
