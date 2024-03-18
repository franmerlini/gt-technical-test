import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap } from 'rxjs';

import { ToastService } from '@gt-technical-test/libs/web/shared/util';

import { ToastActions } from '../actions/toast.actions';

const toastError$ = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToastService)) =>
    actions$.pipe(
      ofType(ToastActions.toastError),
      tap(({ message }) => toastService.error(message))
    ),
  { functional: true, dispatch: false }
);

const toastInfo$ = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToastService)) =>
    actions$.pipe(
      ofType(ToastActions.toastInfo),
      tap(({ message }) => toastService.info(message))
    ),
  { functional: true, dispatch: false }
);

const toastSuccess$ = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToastService)) =>
    actions$.pipe(
      ofType(ToastActions.toastSuccess),
      tap(({ message }) => toastService.success(message))
    ),
  { functional: true, dispatch: false }
);

const toastWarning$ = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToastService)) =>
    actions$.pipe(
      ofType(ToastActions.toastWarning),
      tap(({ message }) => toastService.warning(message))
    ),
  { functional: true, dispatch: false }
);

export const ToastEffects = { toastError$, toastInfo$, toastSuccess$, toastWarning$ };
