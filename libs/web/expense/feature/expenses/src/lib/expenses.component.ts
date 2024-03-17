import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Expense } from '@gt-technical-test/libs/common';
import { ExpensesTableComponent } from '@gt-technical-test/libs/web/expense/ui/expenses-table';

@Component({
  selector: 'gt-expenses',
  standalone: true,
  imports: [RouterLink, ExpensesTableComponent],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl">Expenses tracker</h1>
        <button class="btn btn-primary" routerLink="new">
          New expense
          <svg
            class="w-5 h-5"
            stroke-linejoin="round"
            viewBox="0 0 16 16"
            style="color: currentcolor;"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.75 1.75V1H7.25V1.75V6.75H2.25H1.5V8.25H2.25H7.25V13.25V14H8.75V13.25V8.25H13.75H14.5V6.75H13.75H8.75V1.75Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>

      <gt-expenses-table
        [expenses]="expenses"
        (edit)="onEdit()"
        (delete)="onDelete()"
      ></gt-expenses-table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesComponent {
  expenses: Expense[] = [
    {
      id: 1,
      name: 'Expense 1',
      date: new Date(),
      amount: 100,
      category: {
        id: 1,
        name: 'Category 1',
      },
    },
    {
      id: 2,
      name: 'Expense 2',
      date: new Date(),
      amount: 200,
      category: {
        id: 2,
        name: 'Category 2',
      },
    },
  ];

  onEdit(): void {}

  onDelete(): void {}
}
