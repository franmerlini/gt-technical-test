import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { webShellRoutes } from '@front/libs/web/shell/feature';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(webShellRoutes)],
};
