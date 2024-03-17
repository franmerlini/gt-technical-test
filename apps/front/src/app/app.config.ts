import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { WEB_ROUTES } from '@gt-technical-test/libs/web/shell/feature';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(WEB_ROUTES)],
};
