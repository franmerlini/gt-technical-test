import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import {
  CreateExpenseDto,
  Expense,
  UpdateExpenseDto,
} from '@gt-technical-test/libs/common';

@Injectable()
export class ExpenseService {
  #http = inject(HttpClient);

  getExpenses(): Observable<Expense[]> {
    return this.#http.get<Expense[]>('/api/expenses');
  }

  getExpense(expenseId: number): Observable<Expense | undefined> {
    return this.#http.get<Expense>(`/api/expenses/${expenseId}`);
  }

  createExpense(expense: CreateExpenseDto): Observable<Expense> {
    return this.#http.post<Expense>('/api/expenses', expense);
  }

  updateExpense(
    expenseId: number,
    expense: UpdateExpenseDto
  ): Observable<Expense> {
    return this.#http.put<Expense>(`/api/expenses/${expenseId}`, expense);
  }

  deleteExpense(expenseId: number): Observable<number> {
    return this.#http.delete<number>(`/api/expenses/${expenseId}`);
  }
}
