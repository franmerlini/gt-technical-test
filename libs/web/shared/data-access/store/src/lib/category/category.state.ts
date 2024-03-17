import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { SelectItem } from '@gt-technical-test/libs/common';
import { CategoryActions } from './category.actions';

export const categoryFeatureKey = 'category';

interface State extends EntityState<SelectItem> {
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

const adapter: EntityAdapter<SelectItem> = createEntityAdapter<SelectItem>();

const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
});

const reducer = createReducer(
  initialState,

  on(CategoryActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) =>
    adapter.setAll(categories, {
      ...state,
      loading: false,
      loaded: true,
      error: null,
    })
  ),
  on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  }))
);

export const CategoryFeature = createFeature({
  name: categoryFeatureKey,
  reducer,
  extraSelectors: ({ selectCategoryState }) => ({
    ...adapter.getSelectors(selectCategoryState),
  }),
});
