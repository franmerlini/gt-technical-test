import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, delay, of } from 'rxjs';

import {
  CreateExpenseDto,
  Expense,
  UpdateExpenseDto,
} from '@gt-technical-test/libs/common';

@Injectable()
export class ExpenseService {
  #http = inject(HttpClient);

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

  getExpenses(): Observable<Expense[]> {
    // return this.#http.get<Expense[]>('/api/expenses');
    return of(this.#expenses).pipe(delay(1000));
  }

  getExpense(expenseId: number): Observable<Expense | undefined> {
    // return this.#http.get<Expense>(`/api/expenses/${id}`);
    return of(this.#expenses.find(({ id }) => id === expenseId));
  }

  createExpense(expense: CreateExpenseDto): Observable<Expense> {
    // return this.#http.post<Expense>('/api/expenses', expense);

    const newExpense: Expense = { id: ++this.#lastId, ...expense };

    this.#expenses = [...this.#expenses, newExpense];

    return of(this.#expenses[this.#expenses.length - 1]).pipe(delay(1000));
  }

  updateExpense(
    expenseId: number,
    expense: UpdateExpenseDto
  ): Observable<Expense> {
    // return this.#http.put<Expense>(`/api/expenses/${expenseId}`, expense);
    const index = this.#expenses.findIndex(({ id }) => id === expenseId);

    this.#expenses = this.#expenses.map((e, i) =>
      i === index ? { ...e, ...expense } : e
    );

    return of(this.#expenses[index]).pipe(delay(1000));
  }

  deleteExpense(expenseId: number): Observable<number> {
    // return this.#http.delete<void>(`/api/expenses/${id}`);
    this.#expenses = this.#expenses.filter(({ id }) => id !== expenseId);

    return of(expenseId).pipe(delay(1000));
  }
}
