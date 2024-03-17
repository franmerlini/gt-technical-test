import { Route } from '@angular/router';

import { LayoutComponent } from '@gt-technical-test/libs/web/shell/ui/layout';

export const webShellRoutes: Route[] = [
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
        loadComponent: () =>
          import('@gt-technical-test/libs/web/expense/feature/expenses').then(
            (m) => m.ExpensesComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
