import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import {
  CustomSerializer,
  ROOT_EFFECTS,
  ROOT_REDUCERS,
  RouterFeatureKey,
} from '@gt-technical-test/libs/web/shared/data-access/store';
import { WEB_ROUTES } from '@gt-technical-test/libs/web/shell/feature';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(WEB_ROUTES),
    provideHttpClient(),
    provideStore(ROOT_REDUCERS),
    provideEffects(ROOT_EFFECTS),
    provideRouterStore({
      stateKey: RouterFeatureKey,
      serializer: CustomSerializer,
    }),
    provideStoreDevtools(),
  ],
};
