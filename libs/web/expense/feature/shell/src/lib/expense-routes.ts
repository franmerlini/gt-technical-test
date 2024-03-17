import { Route } from '@angular/router';

import { ExpenseItemComponent } from '@gt-technical-test/libs/web/expense/feature/expense-item';
import { ExpensesComponent } from '@gt-technical-test/libs/web/expense/feature/expenses';

export const EXPENSE_ROUTES: Route[] = [
  {
    path: '',
    component: ExpensesComponent,
  },
  {
    path: 'new',
    component: ExpenseItemComponent,
  },
  {
    path: ':id',
    component: ExpenseItemComponent,
  },
];
