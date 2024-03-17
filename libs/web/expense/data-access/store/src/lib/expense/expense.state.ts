import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { Expense } from '@gt-technical-test/libs/common';
import { selectCurrentRoute } from '@gt-technical-test/libs/web/shared/data-access/store';
import { ExpenseActions } from './expense.actions';

export const expenseFeatureKey = 'expense';

interface State extends EntityState<Expense> {
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

const adapter: EntityAdapter<Expense> = createEntityAdapter<Expense>();

const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
});

const reducer = createReducer(
  initialState,

  on(ExpenseActions.loadExpenses, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(ExpenseActions.loadExpensesSuccess, (state, { expenses }) =>
    adapter.setAll(expenses, {
      ...state,
      loading: false,
      loaded: true,
      error: null,
    })
  ),
  on(ExpenseActions.loadExpensesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),

  on(ExpenseActions.createExpense, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ExpenseActions.createExpenseSuccess, (state, { expense }) =>
    adapter.addOne(expense, {
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(ExpenseActions.createExpenseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const ExpenseFeature = createFeature({
  name: expenseFeatureKey,
  reducer,
  extraSelectors: ({ selectExpenseState }) => ({
    ...adapter.getSelectors(selectExpenseState),
    selectActive: createSelector(
      selectExpenseState,
      selectCurrentRoute,
      (state, route) => state.entities[route.params['id']]
    ),
  }),
});
