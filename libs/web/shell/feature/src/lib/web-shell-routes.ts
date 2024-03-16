import { Route } from '@angular/router';

import { LayoutComponent } from '@front/libs/web/shell/ui/layout';

export const webShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@front/libs/web/home/feature').then((m) => m.HomeComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
