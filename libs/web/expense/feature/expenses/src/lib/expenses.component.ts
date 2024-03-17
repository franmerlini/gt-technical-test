import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Expense } from '@gt-technical-test/libs/common';
import { ExpensesTableComponent } from '@gt-technical-test/libs/web/expense/ui/expenses-table';

@Component({
  selector: 'gt-expenses',
  standalone: true,
  imports: [ExpensesTableComponent],
  template: `
    <div>
      <h1 class="text-2xl mb-2">Expenses tracker</h1>

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
        color: 'BLUE',
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
        color: 'ORANGE',
      },
    },
  ];

  onEdit(): void {}

  onDelete(): void {}
}
