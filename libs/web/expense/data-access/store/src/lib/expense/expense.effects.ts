import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, exhaustMap, filter, map, of, withLatestFrom } from 'rxjs';

import { ExpenseService } from '@gt-technical-test/libs/web/shared/data-access/api';
import { RouterActions } from '@gt-technical-test/libs/web/shared/data-access/store';
import { ExpenseActions } from './expense.actions';
import { ExpenseFeature } from './expense.state';

const loadExpenses$ = createEffect(
  (actions$ = inject(Actions), expenseService = inject(ExpenseService)) =>
    actions$.pipe(
      ofType(ExpenseActions.loadExpenses),
      exhaustMap(() =>
        expenseService.getExpenses().pipe(
          map((expenses) => ExpenseActions.loadExpensesSuccess({ expenses })),
          catchError(() =>
            of(
              ExpenseActions.loadExpensesFailure({
                error: 'Failed to load expenses.',
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

const createExpense$ = createEffect(
  (actions$ = inject(Actions), expenseService = inject(ExpenseService)) =>
    actions$.pipe(
      ofType(ExpenseActions.createExpense),
      exhaustMap(({ expense }) =>
        expenseService.createExpense(expense).pipe(
          map((createdExpense) =>
            ExpenseActions.createExpenseSuccess({ expense: createdExpense })
          ),
          catchError(() =>
            of(
              ExpenseActions.createExpenseFailure({
                error: 'Failed to create expense.',
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

const createExpenseSuccess$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(ExpenseActions.createExpenseSuccess),
      map(() => RouterActions.go(['/expenses']))
    ),
  { functional: true }
);

const updateExpense$ = createEffect(
  (
    actions$ = inject(Actions),
    expenseService = inject(ExpenseService),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(ExpenseActions.updateExpense),
      withLatestFrom(store.select(ExpenseFeature.selectActive)),
      filter(([, { id }]) => !!id),
      exhaustMap(([{ expense }, { id }]) =>
        expenseService.updateExpense(id, expense).pipe(
          map((updatedExpense) =>
            ExpenseActions.updateExpenseSuccess({ expense: updatedExpense })
          ),
          catchError(() =>
            of(
              ExpenseActions.updateExpenseFailure({
                error: 'Failed to update expense.',
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

const updateExpenseSuccess$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(ExpenseActions.updateExpenseSuccess),
      map(() => RouterActions.go(['/expenses']))
    ),
  { functional: true }
);

export const ExpenseEffects = {
  loadExpenses$,
  createExpense$,
  createExpenseSuccess$,
  updateExpense$,
  updateExpenseSuccess$,
};
