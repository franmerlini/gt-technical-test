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

  getExpense(id: number): Observable<Expense> {
    return this.#http.get<Expense>(`/api/expenses/${id}`);
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

  deleteExpense(id: number): Observable<void> {
    return this.#http.delete<void>(`/api/expenses/${id}`);
  }
}
