import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { webShellRoutes } from '@gt-technical-test/libs/web/shell/feature';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(webShellRoutes)],
};
