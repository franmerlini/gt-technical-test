import { Expense } from '@gt-technical-test/libs/common';

import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ExpenseActions = createActionGroup({
  source: 'Expense/API',
  events: {
    'Load Expenses': emptyProps(),
    'Load Expenses Success': props<{ expenses: Expense[] }>(),
    'Load Expenses Failure': props<{ error: string }>(),
  },
});
