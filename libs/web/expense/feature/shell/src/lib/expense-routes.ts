import { Route } from '@angular/router';

import { ExpenseItemComponent } from '@gt-technical-test/libs/web/expense/feature/expense-item';
import { ExpensesComponent } from '@gt-technical-test/libs/web/expense/feature/expenses';
import {
  categoriesGuard,
  expenseExistsGuard,
  expensesGuard,
} from '@gt-technical-test/libs/web/expense/util';

export const EXPENSE_ROUTES: Route[] = [
  {
    path: '',
    component: ExpensesComponent,
    canActivate: [expensesGuard()],
  },
  {
    path: 'new',
    component: ExpenseItemComponent,
    canActivate: [categoriesGuard()],
  },
  {
    path: ':id',
    component: ExpenseItemComponent,
    canActivate: [categoriesGuard(), expenseExistsGuard()],
  },
];
