import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, catchError, filter, of, switchMap, take, tap } from 'rxjs';

import {
  CategoryActions,
  CategoryFeature,
} from '@gt-technical-test/libs/web/expense/data-access/store';

export const categoriesGuard = (): CanActivateFn => () => {
  const store = inject(Store);

  return checkStore(store).pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};

const checkStore = (store: Store): Observable<boolean> => {
  return store.select(CategoryFeature.selectLoaded).pipe(
    tap((loaded) => {
      if (!loaded) {
        store.dispatch(CategoryActions.loadCategories());
      }
    }),
    filter((loaded) => loaded),
    take(1)
  );
};
