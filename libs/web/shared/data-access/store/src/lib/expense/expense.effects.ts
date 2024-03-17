import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, of } from 'rxjs';

import { ExpenseService } from '@gt-technical-test/libs/web/shared/data-access/api';
import { ExpenseActions } from './expense.actions';

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

export const ExpenseEffects = { loadExpenses$ };
