import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, of } from 'rxjs';

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

  getExpenses(): Observable<Expense[]> {
    // return this.#http.get<Expense[]>('/api/expenses');
    return of(this.#expenses);
  }

  getExpense(expenseId: number): Observable<Expense | undefined> {
    // return this.#http.get<Expense>(`/api/expenses/${id}`);
    return of(this.#expenses.find(({ id }) => id === expenseId));
  }

  createExpense(expense: CreateExpenseDto): Observable<Expense> {
    // return this.#http.post<Expense>('/api/expenses', expense);
    let lastId = 0;

    this.#expenses.forEach(({ id }) => {
      if (id > lastId) {
        lastId = id;
      }
    });

    this.#expenses.push({ id: lastId + 1, ...expense });

    return of(this.#expenses[this.#expenses.length - 1]);
  }

  updateExpense(
    expenseId: number,
    expense: UpdateExpenseDto
  ): Observable<Expense> {
    // return this.#http.put<Expense>(`/api/expenses/${expenseId}`, expense);
    const index = this.#expenses.findIndex(({ id }) => id === expenseId);

    this.#expenses[index] = { ...this.#expenses[index], ...expense };

    return of(this.#expenses[index]);
  }

  deleteExpense(expenseId: number): Observable<number> {
    // return this.#http.delete<void>(`/api/expenses/${id}`);
    const index = this.#expenses.findIndex(({ id }) => id === expenseId);

    this.#expenses.splice(index, 1);

    return of(expenseId);
  }
}
