import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  CreateExpenseDto,
  Expense,
  SelectItem,
} from '@gt-technical-test/libs/common';
import { ExpenseFormComponent } from '@gt-technical-test/libs/web/expense/ui/expense-form';

@Component({
  selector: 'gt-expense-item',
  standalone: true,
  imports: [ExpenseFormComponent],
  template: `
    <div>
      <gt-expense-form
        [categoryList]="categories"
        (add)="onAdd($event)"
        (update)="onUpdate($event)"
        (formError)="onFormError($event)"
      ></gt-expense-form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseItemComponent {
  categories: SelectItem[] = [
    {
      id: 1,
      name: 'Category 1',
    },
    {
      id: 2,
      name: 'Category 2',
    },
    {
      id: 3,
      name: 'Category 3',
    },
  ];

  onAdd(expense: CreateExpenseDto) {
    console.log(expense);
  }

  onUpdate(expense: Expense) {
    console.log(expense);
  }

  onFormError(error: string) {
    console.log(error);
  }
}
