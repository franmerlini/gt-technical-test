import { Injectable } from '@nestjs/common';

import {
  CreateExpenseDto,
  Expense,
  UpdateExpenseDto,
} from '@gt-technical-test/libs/common';

@Injectable()
export class ExpenseRepository {
  #expenses: Expense[] = [
    {
      id: 1,
      name: 'Netflix',
      date: new Date(),
      amount: 5.99,
      category: {
        id: 1,
        name: 'Streaming',
      },
    },
    {
      id: 2,
      name: 'Waterly',
      date: new Date(),
      amount: 34.25,
      category: {
        id: 2,
        name: 'Water',
      },
    },
  ];

  #lastId = 2;

  save(expense: CreateExpenseDto): Promise<Expense> {
    const newExpense: Expense = { id: ++this.#lastId, ...expense };

    this.#expenses = [...this.#expenses, newExpense];

    return Promise.resolve(this.#expenses[this.#expenses.length - 1]);
  }

  update(expenseId: number, expense: UpdateExpenseDto): Promise<Expense> {
    const index = this.#expenses.findIndex(({ id }) => id === expenseId);

    this.#expenses = this.#expenses.map((e, i) =>
      i === index ? { ...e, ...expense } : e
    );

    return Promise.resolve(this.#expenses[index]);
  }

  delete(expenseId: number): Promise<number> {
    this.#expenses = this.#expenses.filter(({ id }) => id !== expenseId);

    return Promise.resolve(expenseId);
  }

  findOne(id: number): Promise<Expense | null> {
    return Promise.resolve(
      this.#expenses.find(({ id: expenseId }) => expenseId === id) || null
    );
  }

  find(): Promise<Expense[]> {
    return Promise.resolve(this.#expenses);
  }
}
