import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, of } from 'rxjs';

import { CategoryService } from '@gt-technical-test/libs/web/shared/data-access/api';
import { CategoryActions } from './category.actions';

const loadCategories$ = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) =>
    actions$.pipe(
      ofType(CategoryActions.loadCategories),
      exhaustMap(() =>
        categoryService.getCategories().pipe(
          map((categories) =>
            CategoryActions.loadCategoriesSuccess({ categories })
          ),
          catchError(() =>
            of(
              CategoryActions.loadCategoriesFailure({
                error: 'Failed to load categories.',
              })
            )
          )
        )
      )
    ),
  { functional: true }
);

export const CategoryEffects = { loadCategories$ };
