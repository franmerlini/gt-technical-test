import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, exhaustMap, filter, map, of, switchMap, withLatestFrom } from 'rxjs';

import { ExpenseService } from '@gt-technical-test/libs/web/shared/data-access/api';
import { RouterActions, ToastActions } from '@gt-technical-test/libs/web/shared/data-access/store';

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
          map((createdExpense) => ExpenseActions.createExpenseSuccess({ expense: createdExpense })),
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
      switchMap(() => [
        ToastActions.toastSuccess({ message: 'Expense added successfully.' }),
        RouterActions.go(['/expenses']),
      ])
    ),
  { functional: true }
);

const updateExpense$ = createEffect(
  (actions$ = inject(Actions), expenseService = inject(ExpenseService), store = inject(Store)) =>
    actions$.pipe(
      ofType(ExpenseActions.updateExpense),
      withLatestFrom(store.select(ExpenseFeature.selectActive)),
      filter(([, { id }]) => !!id),
      exhaustMap(([{ expense }, { id }]) =>
        expenseService.updateExpense(id, expense).pipe(
          map((updatedExpense) => ExpenseActions.updateExpenseSuccess({ expense: updatedExpense })),
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
      switchMap(() => [
        ToastActions.toastSuccess({ message: 'Expense updated successfully.' }),
        RouterActions.go(['/expenses']),
      ])
    ),
  { functional: true }
);

const deleteExpense$ = createEffect(
  (actions$ = inject(Actions), expenseService = inject(ExpenseService)) =>
    actions$.pipe(
      ofType(ExpenseActions.deleteExpense),
      exhaustMap(({ expenseId }) =>
        expenseService.deleteExpense(expenseId).pipe(
          map((expenseId) => ExpenseActions.deleteExpenseSuccess({ expenseId })),
          catchError(() =>
            of(
              ExpenseActions.deleteExpenseFailure({
                error: 'Failed to delete expense.',
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

const deleteExpenseSuccess$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(ExpenseActions.deleteExpenseSuccess),
      map(() => ToastActions.toastSuccess({ message: 'Expense deleted successfully.' }))
    ),
  { functional: true }
);

const apiError$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(
        ExpenseActions.loadExpensesFailure,
        ExpenseActions.createExpenseFailure,
        ExpenseActions.updateExpenseFailure,
        ExpenseActions.deleteExpenseFailure
      ),
      map(({ error }) => ToastActions.toastError({ message: error }))
    ),
  { functional: true }
);

export const ExpenseEffects = {
  loadExpenses$,
  createExpense$,
  createExpenseSuccess$,
  updateExpense$,
  updateExpenseSuccess$,
  deleteExpense$,
  deleteExpenseSuccess$,
  apiError$,
};
