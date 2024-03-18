import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import {
  CreateExpenseDto,
  Expense,
  UpdateExpenseDto,
} from '@gt-technical-test/libs/common';

import { ExpenseDrivenAdapter } from '../../adapters';
import { ExpenseDrivenPort, ExpenseDriverPort } from '../../ports';

@Injectable()
export class ExpenseService implements ExpenseDriverPort {
  constructor(
    @Inject(ExpenseDrivenAdapter)
    private readonly expenseDrivenPort: ExpenseDrivenPort
  ) {}

  async createExpense(expense: CreateExpenseDto): Promise<Expense> {
    return this.expenseDrivenPort.createExpense(expense);
  }

  async updateExpense(id: number, expense: UpdateExpenseDto): Promise<Expense> {
    const updatedExpense = await this.expenseDrivenPort.updateExpense(
      id,
      expense
    );

    if (!updatedExpense) {
      throw new NotFoundException(`Expense with ID ${id} doesn't exist.`);
    }

    return this.expenseDrivenPort.getExpense(id) as Promise<Expense>;
  }

  async deleteExpense(id: number): Promise<void> {
    const existsExpense = await this.expenseDrivenPort.getExpense(id);

    if (!existsExpense) {
      throw new NotFoundException(`Expense with ID ${id} doesn't exist.`);
    }

    this.expenseDrivenPort.deleteExpense(id);
  }

  async getExpense(id: number): Promise<Expense> {
    const expense = await this.expenseDrivenPort.getExpense(id);

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} doesn't exist.`);
    }

    return expense;
  }

  async getExpenses(): Promise<Expense[]> {
    const expenses = await this.expenseDrivenPort.getExpenses();

    if (expenses.length === 0) {
      throw new NotFoundException(`No expenses found.`);
    }

    return expenses;
  }
}