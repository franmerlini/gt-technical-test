import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Store } from '@ngrx/store';

import { ExpenseActions, ExpenseFeature } from '@gt-technical-test/libs/web/expense/data-access/store';
import { ExpensesTableComponent } from '@gt-technical-test/libs/web/expense/ui/expenses-table';
import { RouterActions } from '@gt-technical-test/libs/web/shared/data-access/store';

@Component({
  selector: 'gt-expenses',
  standalone: true,
  imports: [RouterLink, ExpensesTableComponent, AsyncPipe],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex flex-col">
        <div class="text-xl breadcrumbs">
          <ul>
            <li>Expenses</li>
          </ul>
        </div>

        <div class="flex justify-end">
          <button class="btn btn-primary" routerLink="new">
            New expense
            <svg class="w-5 h-5" stroke-linejoin="round" viewBox="0 0 16 16" style="color: currentcolor;">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.75 1.75V1H7.25V1.75V6.75H2.25H1.5V8.25H2.25H7.25V13.25V14H8.75V13.25V8.25H13.75H14.5V6.75H13.75H8.75V1.75Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      @if(expenses$ | async; as expenses) { @if(expenses.length) {
      <gt-expenses-table [expenses]="expenses" (edit)="onEdit($event)" (delete)="onDelete($event)"></gt-expenses-table>
      } @else {
      <div role="alert" class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>There are no expenses registered.</span>
      </div>
      } }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent {
  #store = inject(Store);

  expenses$ = this.#store.select(ExpenseFeature.selectAll);

  onEdit(expenseId: number): void {
    this.#store.dispatch(RouterActions.go(['expenses', expenseId]));
  }

  onDelete(expenseId: number): void {
    this.#store.dispatch(ExpenseActions.deleteExpense({ expenseId }));
  }
}
