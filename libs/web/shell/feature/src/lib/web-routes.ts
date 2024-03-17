import { Route } from '@angular/router';

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
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];