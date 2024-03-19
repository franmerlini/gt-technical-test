import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ExpenseEntity } from '@gt-technical-test/libs/api/database';
import { CreateExpenseDto, UpdateExpenseDto } from '@gt-technical-test/libs/common';

import { ExpenseDrivenAdapter } from '../../adapters';
import { ExpenseDrivenPort, ExpenseDriverPort } from '../../ports';

@Injectable()
export class ExpenseService implements ExpenseDriverPort {
  constructor(
    @Inject(ExpenseDrivenAdapter)
    private readonly expenseDrivenPort: ExpenseDrivenPort
  ) {}

  async createExpense(expense: CreateExpenseDto): Promise<ExpenseEntity> {
    return this.expenseDrivenPort.createExpense(expense);
  }

  async updateExpense(id: number, expense: UpdateExpenseDto): Promise<ExpenseEntity> {
    const { affected } = await this.expenseDrivenPort.updateExpense(id, expense);

    if (affected === 0) {
      throw new NotFoundException(`Expense with ID ${id} doesn't exist.`);
    }

    return this.expenseDrivenPort.getExpense(id) as Promise<ExpenseEntity>;
  }

  async deleteExpense(id: number): Promise<number> {
    const { affected } = await this.expenseDrivenPort.deleteExpense(id);

    if (affected === 0) {
      throw new NotFoundException(`Expense with ID ${id} doesn't exist.`);
    }

    return id;
  }

  async getExpense(id: number): Promise<ExpenseEntity> {
    const expense = await this.expenseDrivenPort.getExpense(id);

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} doesn't exist.`);
    }

    return expense;
  }

  async getExpenses(): Promise<ExpenseEntity[]> {
    return this.expenseDrivenPort.getExpenses();
  }
}
