import { Route } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { ExpenseService } from '@gt-technical-test/libs/web/shared/data-access/api';
import {
  ExpenseEffects,
  ExpenseFeature,
} from '@gt-technical-test/libs/web/shared/data-access/store';
import { LayoutComponent } from '@gt-technical-test/libs/web/shell/ui/layout';

export const WEB_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@gt-technical-test/libs/web/home/feature').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'expenses',
        loadChildren: () =>
          import('@gt-technical-test/libs/web/expense/feature/shell').then(
            (m) => m.EXPENSE_ROUTES
          ),
        providers: [
          ExpenseService,
          provideState(ExpenseFeature),
          provideEffects(ExpenseEffects),
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
