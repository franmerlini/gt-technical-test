import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, UpdateResult } from 'typeorm';

import { ExpenseEntity } from '@gt-technical-test/libs/api/database';
import { CreateExpenseDto, UpdateExpenseDto } from '@gt-technical-test/libs/common';

import { ExpenseDrivenPort } from '../../ports';
import { ExpenseRepository } from './repositories';

@Injectable()
export class ExpenseDrivenAdapter implements ExpenseDrivenPort {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: ExpenseRepository
  ) {}

  createExpense(expense: CreateExpenseDto): Promise<ExpenseEntity> {
    return this.expenseRepository.save(expense);
  }

  updateExpense(id: number, expense: UpdateExpenseDto): Promise<UpdateResult> {
    return this.expenseRepository.update(id, expense);
  }

  deleteExpense(id: number): Promise<DeleteResult> {
    return this.expenseRepository.delete(id);
  }

  getExpense(id: number): Promise<ExpenseEntity | null> {
    return this.expenseRepository
      .createQueryBuilder('expense')
      .leftJoinAndSelect('expense.category', 'category')
      .where('expense.id = :id', { id })
      .getOne();
  }

  getExpenses(): Promise<ExpenseEntity[]> {
    return this.expenseRepository
      .createQueryBuilder('expense')
      .leftJoinAndSelect('expense.category', 'category')
      .getMany();
  }
}
