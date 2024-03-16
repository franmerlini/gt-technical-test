import { Route } from '@angular/router';

import { LayoutComponent } from '@front/libs/web/shell/ui/layout';

export const webShellRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
