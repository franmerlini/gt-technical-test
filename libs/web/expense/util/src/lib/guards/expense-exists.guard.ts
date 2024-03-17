import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

import {
  Observable,
  catchError,
  filter,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';

import {
  ExpenseActions,
  ExpenseFeature,
} from '@gt-technical-test/libs/web/expense/data-access/store';
import { Store } from '@ngrx/store';

export const expenseExistsGuard =
  (): CanActivateFn => (route: ActivatedRouteSnapshot) => {
    const store = inject(Store);
    const expenseId = +route.params['id'];

    return checkStore(store).pipe(
      switchMap(() => hasExpense(store, expenseId)),
      catchError(() => of(false))
    );
  };

const checkStore = (store: Store): Observable<boolean> => {
  return store.select(ExpenseFeature.selectLoaded).pipe(
    tap((loaded) => {
      if (!loaded) {
        store.dispatch(ExpenseActions.loadExpenses());
      }
    }),
    filter((loaded) => loaded),
    take(1)
  );
};

const hasExpense = (store: Store, id: number): Observable<boolean> => {
  return store.select(ExpenseFeature.selectEntities).pipe(
    map((entities) => !!entities[id]),
    take(1)
  );
};

// canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
//   return this.checkStore().pipe(
//     switchMap(() => {
//       const id = parseInt(route.params.pizzaId, 10);
//       return this.hasPizza(id);
//     })
//   );
// }

// hasPizza(id: number): Observable<boolean> {
//   return this.store
//     .select(fromStore.getPizzasEntities)
//     .pipe(
//       map((entities: { [key: number]: Pizza }) => !!entities[id]),
//       take(1)
//     );
// }

// checkStore(): Observable<boolean> {
//   return this.store.select(fromStore.getPizzasLoaded).pipe(
//     tap(loaded => {
//       if (!loaded) {
//         this.store.dispatch(new fromStore.LoadPizzas());
//       }
//     }),
//     filter(loaded => loaded),
//     take(1)
//   );
// }
